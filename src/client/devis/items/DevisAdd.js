import React, { PureComponent } from 'react';
import { func, object, array, shape } from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { requireAuth } from '../../utils';
import Form from '../../common/Form';

import { addDevis, editDevis } from '../devisActions';
import Devis from '../../../common/devis/devisSchema';

class DevisAdd extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    let defaultValue = {
      id: '',
      idProject: '',
      price: 0,
      signature: moment(),
      status: 'accepté',
      remarque: '',
      signed: 'false',
      editMode: false
    };

    if (this.props.params.devisId) {
      const devis = Devis.findOne(this.props.params.devisId);
      defaultValue = {
        id: devis.id,
        idProject: devis.idProject,
        price: devis.price,
        signature: moment(devis.signature),
        status: devis.status || 'accepté',
        remarque: devis.remarque,
        signed: devis.signed ? 'true' : 'false',
        _id: devis._id,
        editMode: true
      };
    }

    return (
      <Form
        redirectAfterSubmit={() => {
          this.props.history.push('/devis');
        }}
        editAction={(data, callback) =>
          this.props.editDevis(
            {
              ...data,
              _id: defaultValue._id
            },
            callback
          )}
        addAction={this.props.addDevis}
        editMode={defaultValue.editMode}
        name="Devis"
        fields={[
          {
            fieldKey: 'id',
            label: 'Identifiant',
            required: true,
            floatingLabel: true,
            type: 'text',
            defaultValue: defaultValue.id
          },
          {
            fieldKey: 'idProject',
            label: 'Projet',
            required: true,
            type: 'select',
            defaultValue: defaultValue.idProject,
            options: this.props.projects
          },
          {
            fieldKey: 'price',
            label: 'Prix',
            required: true,
            type: 'number',
            defaultValue: defaultValue.price,
            error: 'Le prix doit être un chiffre',
            floatingLabel: true
          },
          {
            fieldKey: 'remarque',
            label: 'Remarque',
            rows: 3,
            type: 'text',
            defaultValue: defaultValue.remarque,
            floatingLabel: true
          },
          {
            fieldKey: 'signed',
            label: 'Signé?',
            type: 'bool',
            defaultValue: defaultValue.signed
          },
          {
            fieldKey: 'status',
            label: 'Statut',
            type: 'select',
            defaultValue: defaultValue.status,
            options: [
              { _id: 'abandon', name: 'Abandon' },
              { _id: 'accepté', name: 'Accepté' },
              { _id: 'stand by', name: 'Stand by' },
              { _id: 'terminé', name: 'Terminé' }
            ]
          },
          {
            fieldKey: 'signature',
            label: 'Date de signature: ',
            display: 'signed',
            type: 'date',
            defaultValue: defaultValue.signature
          }
        ]}
      />
    );
  }
}

const mapStateToProps = ({ projects }) => ({
  projects
});

const mapDispatchToProps = dispatch => ({
  addDevis: (data, callback) => {
    dispatch(addDevis(data, callback));
  },
  editDevis: (data, callback) => {
    dispatch(editDevis(data, callback));
  }
});

DevisAdd.propTypes = {
  addDevis: func.isRequired,
  editDevis: func.isRequired,
  params: object,
  projects: array.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DevisAdd);

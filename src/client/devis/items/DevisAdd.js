import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Form from '../../common/Form';

import { addDevis, editDevis } from '../devisActions';
import Devis from '../../../common/devis/devisSchema';

const DevisAdd = (props) => {
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

  if (props.params.devisId) {
    const devis = Devis.findOne(props.params.devisId);
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
      redirectAfterSubmit={() => { browserHistory.push('/devis'); }}
      editAction={data => props.editDevis({
        ...data,
        _id: defaultValue._id
      })}
      addAction={props.addDevis}
      editMode={defaultValue.devisId}
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
          options: props.projects
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
          defaultValue: defaultValue.signed,
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
          defaultValue: defaultValue.signature,
        }
      ]}
    />
  );
};

const mapStateToProps = ({ projects }) => ({
  projects
});

const mapDispatchToProps = dispatch => ({
  addDevis: (data) => {
    dispatch(addDevis(data));
  },
  editDevis: (data) => {
    dispatch(editDevis(data));
  }
});

DevisAdd.propTypes = {
  addDevis: React.PropTypes.func.isRequired,
  editDevis: React.PropTypes.func.isRequired,
  params: React.PropTypes.object,
  projects: React.PropTypes.array.isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(DevisAdd);

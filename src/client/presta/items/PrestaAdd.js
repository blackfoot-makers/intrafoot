import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Form from '../../common/Form';

import { addPresta, editPresta } from '../prestaActions';
import Prestas from '../../../common/presta/prestaSchema';

const PrestaAddComponent = ({
    idContact,
    company,
    prestation,
    price,
    facturation,
    accompte,
    payedDate,
    remarque,
    payed,
    users,
    editMode,
    _id,
    ...funcProps
  }) => (
    <Form
      redirectAfterSubmit={() => { browserHistory.push('/presta'); }}
      editAction={(data, callback) => funcProps.editPresta({
        ...data,
        _id
      }, callback)}
      addAction={funcProps.addPresta}
      editMode={editMode}
      name="Presta"
      fields={[
        {
          fieldKey: 'idContact',
          label: 'Prestataire',
          required: true,
          floatingLabel: true,
          type: 'select',
          defaultValue: idContact,
          options: users.allUsers
        },
        {
          fieldKey: 'company',
          label: 'Entreprise',
          floatingLabel: true,
          required: true,
          type: 'select',
          defaultValue: company,
          options: users.companies
        },
        {
          fieldKey: 'price',
          label: 'Prix',
          required: true,
          floatingLabel: true,
          type: 'number',
          defaultValue: price
        },
        {
          fieldKey: 'prestation',
          label: 'Prestation',
          type: 'text',
          defaultValue: prestation,
          required: true,
          floatingLabel: true
        },
        {
          fieldKey: 'accompte',
          label: 'Accompte',
          required: true,
          floatingLabel: true,
          type: 'number',
          defaultValue: accompte
        },
        {
          fieldKey: 'payed',
          label: 'Réglée?',
          type: 'select',
          defaultValue: payed,
          options: [
            { _id: 'true', name: 'Oui' },
            { _id: 'false', name: 'Non' }
          ]
        },
        {
          fieldKey: 'facturation',
          label: 'Date de facturation',
          type: 'date',
          defaultValue: facturation,
          floatingLabel: true
        },
        {
          fieldKey: 'remarque',
          label: 'Remarque',
          rows: 3,
          type: 'text',
          defaultValue: remarque,
        },
        {
          fieldKey: 'payedDate',
          label: 'Date de règlement',
          type: 'date',
          display: 'payed',
          defaultValue: payedDate
        }
      ]}
    />
);

PrestaAddComponent.propTypes = {
  addPresta: React.PropTypes.func.isRequired,
  editPresta: React.PropTypes.func.isRequired,
  price: React.PropTypes.number.isRequired,
  _id: React.PropTypes.string,
  users: React.PropTypes.object.isRequired,
  accompte: React.PropTypes.number.isRequired,
  idContact: React.PropTypes.string.isRequired,
  company: React.PropTypes.string.isRequired,
  prestation: React.PropTypes.string.isRequired,
  facturation: React.PropTypes.instanceOf(moment).isRequired,
  payed: React.PropTypes.string.isRequired,
  remarque: React.PropTypes.string.isRequired,
  payedDate: React.PropTypes.instanceOf(moment).isRequired,
  editMode: React.PropTypes.bool.isRequired
};

class PrestaAdd extends React.Component {

  constructor(props) {
    super(props);
    let defaultValue = {
      idContact: '',
      company: '',
      prestation: '',
      price: 0,
      facturation: moment(),
      accompte: 0,
      payedDate: moment(),
      remarqu: '',
      payed: 'false',
      editMode: false
    };

    if (props.params.prestaId) {
      const presta = Prestas.findOne(props.params.prestaId);
      defaultValue = {
        idContact: presta.idContact,
        company: presta.company,
        prestation: presta.prestation,
        price: presta.price,
        facturation: presta.facturation && moment(presta.facturation),
        accompte: presta.accompte,
        payedDate: presta.payedDate && moment(presta.payedDate),
        remarque: presta.remarque || '',
        payed: presta.payed ? 'true' : 'false',
        _id: presta._id,
        editMode: true
      };
    }

    this.state = {
      ...defaultValue,
      users: props.users
    };
  }

  render() {
    return (
      <PrestaAddComponent
        {...this.props}
        {...this.state}
      />
    );
  }
}

const mapStateToProps = ({ users }) => ({
  users
});

const mapDispatchToProps = dispatch => ({
  addPresta: (data, callback) => {
    dispatch(addPresta(data, callback));
  },
  editPresta: (data, callback) => {
    dispatch(editPresta(data, callback));
  }
});

PrestaAdd.propTypes = {
  users: React.PropTypes.object.isRequired,
  params: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(PrestaAdd);

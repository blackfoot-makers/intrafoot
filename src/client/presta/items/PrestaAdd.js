import React from 'react';
import {
  func,
  number,
  string,
  object,
  instanceOf,
  bool,
  shape
} from 'prop-types';
import { connect } from 'react-redux';
import moment from 'moment';

import { requireAuth } from '../../utils';
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
  history,
  _id,
  ...funcProps
}) =>
  <Form
    redirectAfterSubmit={() => {
      history.push('/presta');
    }}
    editAction={(data, callback) =>
      funcProps.editPresta(
        {
          ...data,
          _id
        },
        callback
      )}
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
        type: 'bool',
        defaultValue: payed
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
        defaultValue: remarque
      },
      {
        fieldKey: 'payedDate',
        label: 'Date de règlement',
        type: 'date',
        display: 'payed',
        defaultValue: payedDate
      }
    ]}
  />;

PrestaAddComponent.propTypes = {
  addPresta: func.isRequired,
  editPresta: func.isRequired,
  price: number.isRequired,
  _id: string,
  users: object.isRequired,
  accompte: number.isRequired,
  idContact: string.isRequired,
  company: string.isRequired,
  prestation: string.isRequired,
  facturation: instanceOf(moment).isRequired,
  payed: string.isRequired,
  remarque: string.isRequired,
  payedDate: instanceOf(moment).isRequired,
  editMode: bool.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
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
      remarque: '',
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

  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    return <PrestaAddComponent {...this.props} {...this.state} />;
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
  users: object.isRequired,
  params: object,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(PrestaAdd);

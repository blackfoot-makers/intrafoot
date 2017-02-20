import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Form from '../../common/Form';

import { addFacture, editFacture } from '../factureActions';
import Factures from '../../../common/facture/factureSchema';

const FactureAdd = (props) => {
  let defaultValue = {
    id: '',
    idProject: '',
    idDevis: '',
    price: 0,
    sentDate: moment(),
    payed: '',
    pricePayed: '',
    delayTillPayed: 60,
    remarque: '',
    payedDate: moment(),
    editMode: false
  };

  if (props.params.factureId) {
    const facture = Factures.findOne(props.params.factureId);
    defaultValue = {
      id: facture.id,
      idProject: facture.idProject,
      idDevis: facture.idDevis,
      price: facture.price,
      sentDate: moment(facture.sentDate),
      payed: facture.payed,
      pricePayed: facture.pricePayed,
      delayTillPayed: facture.delayTillPayed,
      remarque: facture.remarque,
      payedDate: facture.payedDate,
      _id: facture._id,
      editMode: true
    };
  }

  return (
    <Form
      redirectAfterSubmit={() => { browserHistory.push('/facture'); }}
      editAction={props.editFacture}
      addAction={props.addFacture}
      editMode={defaultValue.editMode}
      name="Facture"
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
          fieldKey: 'idDevis',
          label: 'Devis',
          required: true,
          type: 'select',
          defaultValue: defaultValue.idDevis,
          options: props.devis
        },
        {
          fieldKey: 'price',
          label: 'Prix',
          required: true,
          floatingLabel: true,
          type: 'number',
          defaultValue: defaultValue.price
        },
        {
          fieldKey: 'sentDate',
          label: 'Envoyé le',
          type: 'date',
          defaultValue: defaultValue.sentDate
        },
        {
          fieldKey: 'payed',
          label: 'Réglée?',
          type: 'select',
          defaultValue: defaultValue.payed,
          options: [
            { _id: 'true', name: 'Oui' },
            { _id: 'false', name: 'Non' },
            { _id: 'annulé', name: 'Annulé' }
          ]
        },
        {
          fieldKey: 'pricePayed',
          label: 'Versement',
          type: 'number',
          defaultValue: defaultValue.pricePayed,
        },
        {
          fieldKey: 'delayTillPayed',
          label: 'Délai de règlement',
          type: 'number',
          defaultValue: defaultValue.delayTillPayed,
          required: true,
          floatingLabel: true
        },
        {
          fieldKey: 'remarque',
          label: 'Remarque',
          rows: 3,
          type: 'text',
          defaultValue: defaultValue.remarque,
        },
        {
          fieldKey: 'payedDate',
          label: 'Date de règlement',
          type: 'date',
          display: 'payed',
          defaultValue: defaultValue.payedDate
        }
      ]}
    />
  );
};

const mapStateToProps = ({ projects, devis }) => ({
  projects,
  devis
});

const mapDispatchToProps = dispatch => ({
  addFacture: (data) => {
    dispatch(addFacture(data));
  },
  editFacture: (data) => {
    dispatch(editFacture(data));
  }
});

FactureAdd.propTypes = {
  projects: React.PropTypes.array.isRequired,
  devis: React.PropTypes.array.isRequired,
  addFacture: React.PropTypes.func.isRequired,
  editFacture: React.PropTypes.func.isRequired,
  params: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(FactureAdd);

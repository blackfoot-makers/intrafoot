import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import moment from 'moment';

import Form from '../../common/Form';

import { addFacture, editFacture } from '../factureActions';
import Factures from '../../../common/facture/factureSchema';
import Devis from '../../../common/devis/devisSchema';
import Projects from '../../../common/project/projectSchema';

const FactureAddComponent = ({
    id,
    idProject,
    idDevis,
    sentDate,
    payed,
    pricePayed,
    price,
    delayTillPayed,
    remarque,
    payedDate,
    editMode,
    onChange,
    projects,
    devis,
    ...funcProps
  }) => (
    <Form
      redirectAfterSubmit={() => { browserHistory.push('/facture'); }}
      editAction={data => funcProps.editFacture({
        ...data,
        _id: id
      })}
      addAction={funcProps.addFacture}
      editMode={editMode}
      onChange={onChange}
      name="Facture"
      fields={[
        {
          fieldKey: 'id',
          label: 'Identifiant',
          required: true,
          floatingLabel: true,
          type: 'text',
          defaultValue: id
        },
        {
          fieldKey: 'idProject',
          label: 'Projet',
          required: true,
          type: 'select',
          defaultValue: idProject,
          options: projects
        },
        {
          fieldKey: 'idDevis',
          label: 'Devis',
          required: true,
          type: 'select',
          defaultValue: idDevis,
          options: devis
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
          fieldKey: 'sentDate',
          label: 'Envoyé le',
          type: 'date',
          defaultValue: sentDate
        },
        {
          fieldKey: 'payed',
          label: 'Réglée?',
          type: 'select',
          defaultValue: payed,
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
          defaultValue: pricePayed,
        },
        {
          fieldKey: 'delayTillPayed',
          label: 'Délai de règlement',
          type: 'number',
          defaultValue: delayTillPayed,
          required: true,
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

FactureAddComponent.propTypes = {
  projects: React.PropTypes.array.isRequired,
  devis: React.PropTypes.array.isRequired,
  addFacture: React.PropTypes.func.isRequired,
  editFacture: React.PropTypes.func.isRequired,
  onChange: React.PropTypes.func.isRequired,
  price: React.PropTypes.number.isRequired,
  id: React.PropTypes.string.isRequired,
  idProject: React.PropTypes.string.isRequired,
  idDevis: React.PropTypes.string.isRequired,
  sentDate: React.PropTypes.instanceOf(moment).isRequired,
  payed: React.PropTypes.string.isRequired,
  pricePayed: React.PropTypes.string.isRequired,
  delayTillPayed: React.PropTypes.number.isRequired,
  remarque: React.PropTypes.string.isRequired,
  payedDate: React.PropTypes.instanceOf(moment).isRequired,
  editMode: React.PropTypes.bool.isRequired
};

class FactureAdd extends React.Component {

  constructor(props) {
    super(props);
    let defaultValue = {
      id: '',
      idProject: '',
      idDevis: '',
      sentDate: moment(),
      payed: '',
      pricePayed: '',
      price: 0,
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
        sentDate: moment(facture.sentDate),
        payed: facture.payed,
        price: facture.price,
        pricePayed: facture.pricePayed,
        delayTillPayed: facture.delayTillPayed,
        remarque: facture.remarque,
        payedDate: facture.payedDate,
        _id: facture._id,
        editMode: true
      };
    }

    this.state = {
      ...defaultValue,
      devis: props.devis
    };
    this.onChange = this.onChange.bind(this);
  }

  onChange(data) {
    if (data.idProject && data.idProject !== this.state.idProject) {
      this.changeFactureInfoFromProject(data.idProject);
    }
    if (data.idDevis && data.idDevis !== this.state.idDevis) {
      this.changeFactureInfoFromDevis(data.idDevis);
    }
  }

  changeFactureInfoFromDevis(idDevis) {
    const devis = Devis.findOne(idDevis);
    if (devis) {
      this.setState({
        ...this.state,
        price: devis.price,
        sentDate: devis.signature && moment(devis.signature),
        idDevis
      });
    }
  }

  changeFactureInfoFromProject(idProject) {
    const project = Projects.findOne(idProject);
    if (project) {
      const devis = project.devis.map(devisId => (
        Devis.findOne(devisId)
      ));
      this.setState({
        ...this.state,
        devis,
        idProject
      });
    }
  }

  render() {
    return (
      <FactureAddComponent
        {...this.props}
        {...this.state}
        onChange={this.onChange}
      />
    );
  }
}

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
  devis: React.PropTypes.array.isRequired,
  params: React.PropTypes.object
};

export default connect(mapStateToProps, mapDispatchToProps)(FactureAdd);

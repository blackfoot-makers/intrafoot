import React, { PureComponent } from 'react';
import {
  array,
  func,
  number,
  string,
  instanceOf,
  bool,
  shape
} from 'prop-types';
import { connect } from 'react-redux';
import { bind } from 'decko';
import moment from 'moment';

import Form from '../../common/Form';
import { requireAuth } from '../../utils';
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
  history,
  _id,
  ...funcProps
}) =>
  <Form
    redirectAfterSubmit={() => {
      history.push('/facture');
    }}
    editAction={(data, callback) =>
      funcProps.editFacture(
        {
          ...data,
          _id
        },
        callback
      )}
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
        floatingLabel: true
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

FactureAddComponent.propTypes = {
  projects: array.isRequired,
  devis: array.isRequired,
  addFacture: func.isRequired,
  editFacture: func.isRequired,
  onChange: func.isRequired,
  price: number.isRequired,
  _id: string,
  id: string.isRequired,
  idProject: string.isRequired,
  idDevis: string.isRequired,
  sentDate: instanceOf(moment).isRequired,
  payed: string.isRequired,
  pricePayed: number.isRequired,
  delayTillPayed: number.isRequired,
  remarque: string.isRequired,
  payedDate: instanceOf(moment).isRequired,
  editMode: bool.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

class FactureAdd extends PureComponent {
  constructor(props) {
    super(props);
    let defaultValue = {
      id: '',
      idProject: '',
      idDevis: '',
      sentDate: moment(),
      payed: '',
      pricePayed: 0,
      price: 0,
      delayTillPayed: 60,
      remarque: '',
      payedDate: moment(),
      editMode: false
    };

    if (props.match.params.factureId) {
      const facture = Factures.findOne(props.match.params.factureId);
      defaultValue = {
        id: facture.id,
        idProject: facture.idProject,
        idDevis: facture.idDevis,
        sentDate: moment(facture.sentDate),
        payed: facture.payed,
        price: facture.price,
        pricePayed: facture.pricePayed || 0,
        delayTillPayed: facture.delayTillPayed,
        remarque: facture.remarque || '',
        payedDate: moment(facture.payedDate),
        _id: facture._id,
        editMode: true
      };
    }

    this.state = {
      ...defaultValue,
      devis: props.devis
    };
  }

  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  @bind
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
      this.setState(state => ({
        ...state,
        price: devis.price,
        sentDate: devis.signature && moment(devis.signature),
        idDevis
      }));
    }
  }

  changeFactureInfoFromProject(idProject) {
    const project = Projects.findOne(idProject);
    if (project) {
      const devis = project.devis.map(devisId => Devis.findOne(devisId));
      this.setState(state => ({
        ...state,
        devis,
        idProject
      }));
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
  addFacture: (data, callback) => {
    dispatch(addFacture(data, callback));
  },
  editFacture: (data, callback) => {
    dispatch(editFacture(data, callback));
  }
});

FactureAdd.propTypes = {
  devis: array.isRequired,
  match: shape({
    params: shape({
      factureId: string
    }).isRequired
  }).isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default connect(mapStateToProps, mapDispatchToProps)(FactureAdd);

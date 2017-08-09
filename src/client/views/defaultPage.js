import React, { PureComponent } from 'react';
import { array, object, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Grid } from 'react-mdl';

import { requireAuth } from '../utils';
import {
  LinkToProject,
  LinkToDevis,
  LinkToFacture,
  LinkToContact,
  LinkToPresta
} from '../common/Links';
import CustomCell from './components/Cell';
import CustomDataTable from './components/Datatable';

class DefaultPage extends PureComponent {
  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  _getPrestas() {
    const prestas = [
      { type: 'Réglés', ht: 0, tva: 0, total: 0 },
      { type: 'Non-réglés', ht: 0, tva: 0, total: 0 }
    ];

    this.props.prestas.map(data => {
      let index = 0;

      if (data.payed === false) {
        index = 1;
      }
      prestas[index].ht += data.price;
      prestas[index].tva += data.price * 0.2;
      prestas[index].total = prestas[index].ht + prestas[index].tva;
      return data;
    });

    return prestas;
  }

  _getDevis() {
    const devis = [
      { type: 'Acceptés', ht: 0, tva: 0, total: 0 },
      { type: 'Signés', ht: 0, tva: 0, total: 0 },
      { type: 'Stand by', ht: 0, tva: 0, total: 0 },
      { type: 'Terminé', ht: 0, tva: 0, total: 0 }
    ];

    this.props.devis.map(data => {
      let index = 0;

      switch (data.status) {
        case 'stand by':
          index = 2;
          break;
        case 'terminé':
          index = 3;
          break;
        case 'accepté':
        default:
          index = 0;
      }
      devis[index].ht += data.price;
      devis[index].tva += data.price * 0.2;
      devis[index].total = devis[index].ht + devis[index].tva;
      // In devis signed there is no finished ones
      if (data.signed && data.status !== 'terminé') {
        devis[1].ht += data.price;
        devis[1].tva += data.price * 0.2;
        devis[1].total = devis[1].ht + devis[1].tva;
      }
      return data;
    });

    return devis;
  }

  _getFactures() {
    const factures = [
      { type: 'Envoyées', ht: 0, tva: 0, total: 0 },
      { type: 'Réglées', ht: 0, tva: 0, total: 0 },
      { type: 'Différence', ht: 0, tva: 0, total: 0 }
    ];

    this.props.factures.map(data => {
      factures[0].ht += data.price;
      factures[0].tva += data.price * 0.2;
      factures[0].total = factures[0].ht + factures[0].tva;
      if (data.payed === 'true') {
        factures[1].ht += data.price;
        factures[1].tva += data.price * 0.2;
        factures[1].total = factures[1].ht + factures[1].tva;
      } else {
        factures[2].ht += data.price;
        factures[2].tva += data.price * 0.2;
        factures[2].total = factures[2].ht + factures[2].tva;
      }
      return data;
    });

    return factures;
  }

  _getProject() {
    const projects = [{ now: 0, cancel: 0, finished: 0, standBy: 0 }];

    this.props.projects.map(data => {
      switch (data.status) {
        default:
        case 'en cours':
          projects[0].now += 1;
          break;
        case 'abandon':
          projects[0].cancel += 1;
          break;
        case 'terminé':
          projects[0].finished += 1;
          break;
        case 'stand by':
          projects[0].standBy += 1;
          break;
      }
      return data;
    });

    return projects;
  }

  _getVirtuRows() {
    const virtuRows = [
      {
        presta: 0,
        salaire: 0,
        tva: 0,
        materiel: 0,
        cnoire: 0,
        mixtes: 0,
        benef: 0,
        total: 0
      }
    ];
    return virtuRows;
  }

  render() {
    const facturesRows = this._getFactures();
    const devisRows = this._getDevis();
    const prestaRows = this._getPrestas();
    const projectRows = this._getProject();
    const virtuRows = this._getVirtuRows();

    return (
      <Grid>
        <CustomCell
          colSize={8}
          title="Virtucompte"
          actionComponent={LinkToFacture}
          actionText="Ajouter une entrée au Virtucompte"
        >
          <CustomDataTable
            rows={virtuRows}
            titles={[
              { title: 'Presta', tooltip: 'Le compte des prestas' },
              { title: 'Salaire', tooltip: 'Le compte des salaires' },
              { title: 'TVA', tooltip: 'Le compte TVA' },
              { title: 'Matériel', tooltip: 'Le compte pour le matériel' },
              { title: 'Caisse noire', tooltip: 'Le compte caisse noire' },
              { title: 'Charges mixtes', tooltip: 'Le compte charges mixtes' },
              { title: 'Benef', tooltip: 'Le compte benef' },
              { title: 'Total', tooltip: 'Le compte total de tous les comptes' }
            ]}
          />
        </CustomCell>
        <CustomCell
          colSize={4}
          title="Contact"
          actionComponent={LinkToContact}
          actionText="Voir les contacts"
        >
          <div>
            Résumé des contacts: <br />
            Nous avons en ce moment {this.props.users.allUsers.length} contacts
            dont {this.props.users.blackfootUsers.length} administrateurs.
          </div>
        </CustomCell>
        <CustomCell
          title="Factures"
          actionComponent={LinkToFacture}
          actionText="Voir les factures"
          notification="4"
        >
          <CustomDataTable
            rows={facturesRows}
            titles={[
              { title: 'Type', tooltip: 'Le type de facture' },
              {
                title: 'Hors taxes',
                tooltip: 'Le prix total hors taxe des factures'
              },
              { title: 'TVA', tooltip: 'La tva des factures' },
              { title: 'Total', tooltip: 'Le total tout compris des factures' }
            ]}
          />
        </CustomCell>
        <CustomCell
          title="Devis"
          actionComponent={LinkToDevis}
          actionText="Voir les devis"
        >
          <CustomDataTable
            rows={devisRows}
            titles={[
              { title: 'Type', tooltip: 'Le type de devis' },
              {
                title: 'Hors taxes',
                tooltip: 'Le prix total hors taxe des devis'
              },
              { title: 'TVA', tooltip: 'La tva des devis' },
              { title: 'Total', tooltip: 'Le total tout compris des devis' }
            ]}
          />
        </CustomCell>
        <CustomCell
          title="Projets"
          actionComponent={LinkToProject}
          actionText="Voir les projets"
        >
          <CustomDataTable
            rows={projectRows}
            isPrice={false}
            titles={[
              { title: 'En cours', tooltip: 'Le nombre de projets en cours' },
              {
                title: 'Abandonné',
                tooltip: 'Le nombre de projets abandonné'
              },
              { title: 'Terminé', tooltip: 'Le nombre de projets fini' },
              { title: 'Stand by', tooltip: 'Le nombre de projets en stand by' }
            ]}
          />
        </CustomCell>
        <CustomCell
          title="Prestataires"
          actionComponent={LinkToPresta}
          actionText="Voir les prestataires"
        >
          <CustomDataTable
            rows={prestaRows}
            titles={[
              { title: 'Type', tooltip: 'Réglé ou non?' },
              {
                title: 'Hors taxes',
                tooltip: 'Le prix total hors taxe des prestas'
              },
              { title: 'TVA', tooltip: 'La tva des prestas' },
              { title: 'Total', tooltip: 'Le total tout compris' }
            ]}
          />
        </CustomCell>
      </Grid>
    );
  }
}

DefaultPage.propTypes = {
  projects: array.isRequired,
  devis: array.isRequired,
  factures: array.isRequired,
  users: object.isRequired,
  prestas: array.isRequired,
  history: shape({
    replace: func.isRequired
  }).isRequired
};

DefaultPage.childContextTypes = {
  muiTheme: object
};

function mapStateToProps(state) {
  return {
    currentUser: Meteor.user(),
    devis: state.devis,
    projects: state.projects,
    factures: state.factures,
    users: state.users,
    prestas: state.prestas
  };
}

export default connect(mapStateToProps)(DefaultPage);

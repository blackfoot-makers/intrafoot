import React, { PureComponent } from 'react';
import { array, object, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {
  Grid,
  Cell,
  Card,
  CardTitle,
  CardText,
  CardActions,
  CardMenu,
  DataTable,
  TableHeader,
  Badge,
  Button,
  Icon
} from 'react-mdl';

import { requireAuth } from '../utils';
import {
  LinkToProject,
  LinkToDevis,
  LinkToFacture,
  LinkToContact,
  LinkToPresta
} from '../common/Links';

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
    const colSize = 6;

    return (
      <Grid>
        <Cell col={8} component={Card} shadow={0}>
          <CardTitle>Virtucompte</CardTitle>
          <CardText>
            <DataTable rows={virtuRows}>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="presta"
                tooltip="Le compte des prestas"
              >
                Presta
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="salaire"
                tooltip="Le compte des salaires"
              >
                Salaire
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="tva"
                tooltip="Le compte TVA"
              >
                TVA
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="materiel"
                tooltip="Le compte pour le matériel"
              >
                Matériel
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="cnoire"
                tooltip="Le compte caisse noire"
              >
                Caisse noire
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="mixtes"
                tooltip="Le compte charges mixtes"
              >
                Charges mixtes
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="benef"
                tooltip="Le compte benef"
              >
                Benef
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="total"
                tooltip="Le compte total de tous les comptes"
              >
                Total
              </TableHeader>
            </DataTable>
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToFacture}>
              Ajouter une entrée au Virtucompte
            </Button>
          </CardActions>
        </Cell>
        <Cell col={4} component={Card} shadow={0}>
          <CardTitle>Contacts</CardTitle>
          <CardText>
            Résumé des contacts: <br />
            Nous avons en ce moment {this.props.users.allUsers.length} contacts
            dont {this.props.users.blackfootUsers.length} administrateurs.
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToContact}>
              Voir les contacts
            </Button>
          </CardActions>
        </Cell>
        <Cell col={colSize} component={Card} shadow={0}>
          <CardTitle>Factures</CardTitle>
          <CardText>
            <DataTable rows={facturesRows}>
              <TableHeader name="type" tooltip="Le type de facture">
                Type
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="ht"
                tooltip="Le prix total hors taxe des factures"
              >
                Hors taxes
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="tva"
                tooltip="La tva des factures"
              >
                TVA
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="total"
                tooltip="Le total tout compris des factures"
              >
                Total
              </TableHeader>
            </DataTable>
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToFacture}>
              Voir les factures
            </Button>
          </CardActions>
          <CardMenu>
            <Badge text="4" overlap>
              <Icon name="notifications" />
            </Badge>
          </CardMenu>
        </Cell>
        <Cell col={colSize} component={Card} shadow={0}>
          <CardTitle>Projets</CardTitle>
          <CardText>
            <DataTable rows={projectRows}>
              <TableHeader
                numeric
                name="now"
                tooltip="Le nombre de projets en cours"
              >
                En cours
              </TableHeader>
              <TableHeader
                numeric
                name="cancel"
                tooltip="Le nombre de projets abandonné"
              >
                Abandonné
              </TableHeader>
              <TableHeader
                numeric
                name="finished"
                tooltip="Le nombre de projets fini"
              >
                Terminé
              </TableHeader>
              <TableHeader
                numeric
                name="standBy"
                tooltip="Le nombre de projets en stand by"
              >
                Stand by
              </TableHeader>
            </DataTable>
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToProject}>
              Voir les projets
            </Button>
          </CardActions>
        </Cell>
        <Cell col={colSize} component={Card} shadow={0}>
          <CardTitle>Devis</CardTitle>
          <CardText>
            <DataTable rows={devisRows}>
              <TableHeader name="type" tooltip="Le type de devis">
                Type
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="ht"
                tooltip="Le prix total hors taxe des devis"
              >
                Hors taxes
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="tva"
                tooltip="La tva des devis"
              >
                TVA
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="total"
                tooltip="Le total tout compris des devis"
              >
                Total
              </TableHeader>
            </DataTable>
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToDevis}>
              Voir les devis
            </Button>
          </CardActions>
        </Cell>
        <Cell col={colSize} component={Card} shadow={0}>
          <CardTitle>Prestataires</CardTitle>
          <CardText>
            <DataTable rows={prestaRows}>
              <TableHeader name="type" tooltip="Réglé ou non?">
                Type
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="ht"
                tooltip="Le prix total hors taxe des devis"
              >
                Hors taxes
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="tva"
                tooltip="La tva des devis"
              >
                TVA
              </TableHeader>
              <TableHeader
                numeric
                cellFormatter={price => `${price.toFixed(2)}€`}
                name="total"
                tooltip="Le total tout compris"
              >
                Total
              </TableHeader>
            </DataTable>
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToPresta}>
              Voir les prestataires
            </Button>
          </CardActions>
        </Cell>
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

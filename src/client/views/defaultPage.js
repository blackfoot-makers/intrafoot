import React from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, DataTable, TableHeader, Badge, Button, Icon } from 'react-mdl';

import { LinkToProject, LinkToIndex, LinkToDevis } from '../common/Links';

class DefaultPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  _getDevis() {
    const devis = [
      { type: 'Acceptés', ht: 0, tva: 0, total: 0 },
      { type: 'Signés', ht: 0, tva: 0, total: 0 },
      { type: 'Stand by', ht: 0, tva: 0, total: 0 },
      { type: 'Terminé', ht: 0, tva: 0, total: 0 }
    ];

    this.props.devis.map((data) => {
      console.log('DATA IS ', data);
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
      devis[index].tva += (data.price * 0.2);
      devis[index].total = devis[index].ht + devis[index].tva;
      if (data.signed) {
        devis[1].ht += data.price;
        devis[1].tva += (data.price * 0.2);
        devis[1].total = devis[1].ht + devis[1].tva;
      }
      return data;
    });

    console.log('devis is == ', devis);
    return (devis);
  }

  render() {
    const facturesRows = [
      { type: 'Envoyées', ht: 141550, tva: 28310, total: 169860 },
      { type: 'Réglées', ht: 141550, tva: 28310, total: 169860 },
      { type: 'Différence', ht: 141550, tva: 28310, total: 169860 }
    ];
    const devisRows = this._getDevis();

    return (
      <Grid>
        <Cell col={6} component={Card} shadow={0}>
          <CardTitle>
            Factures
          </CardTitle>
          <CardText>
            <DataTable rows={facturesRows}>
              <TableHeader name="type" tooltip="Le type de facture">Type</TableHeader>
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
            <Button colored ripple component={LinkToIndex}>
              Voir les factures
            </Button>
          </CardActions>
          <CardMenu>
            <Badge text="4" overlap>
              <Icon name="notifications" />
            </Badge>
          </CardMenu>
        </Cell>
        <Cell col={6} component={Card} shadow={0}>
          <CardTitle>
            Projets
          </CardTitle>
          <CardText>
            Résumé des projets: <br />
            Nous avons en ce moment { this.props.projects.length } projets.
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToProject}>
              Voir les projets
            </Button>
          </CardActions>
        </Cell>
        <Cell col={6} component={Card} shadow={0}>
          <CardTitle>
            Devis
          </CardTitle>
          <CardText>
            <DataTable rows={devisRows}>
              <TableHeader name="type" tooltip="Le type de devis">Type</TableHeader>
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
        <Cell col={6} component={Card} shadow={0}>
          <CardTitle>
            Contacts
          </CardTitle>
          <CardText>
            Résumé des contacts
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToIndex}>
              Voir les contacts
            </Button>
          </CardActions>
        </Cell>
      </Grid>
    );
  }
}

DefaultPage.propTypes = {
  projects: React.PropTypes.array.isRequired,
  devis: React.PropTypes.array.isRequired
};

DefaultPage.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    currentUser: Meteor.user(),
    devis: state.devis,
    projects: state.projects
  };
}

export default connect(mapStateToProps)(DefaultPage);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Grid, Cell, Card, CardTitle, CardText, CardActions, CardMenu, DataTable, TableHeader, Badge, Button, Icon } from 'react-mdl';

import { LinkToProject, LinkToIndex } from '../common/Links';

class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  componentWillMount() {
  }

  render() {
    const facturesRows = [
      { type: 'Envoyées', ht: 141550, tva: 28310, total: 169860 },
      { type: 'Réglées', ht: 141550, tva: 28310, total: 169860 },
      { type: 'Différence', ht: 141550, tva: 28310, total: 169860 }
    ];
    const devisRows = [
      { type: 'Acceptés', ht: 189800, tva: 37960, total: 227760 },
      { type: 'Signés', ht: 189800, tva: 37960, total: 227760 },
      { type: 'Stand by', ht: 189800, tva: 37960, total: 227760 },
      { type: 'Terminé', ht: 189800, tva: 37960, total: 227760 }
    ];

    return (
      <Grid>
        <Cell col={6} component={Card} shadow={0}>
          <CardTitle>
            Factures
          </CardTitle>
          <CardText>
            <DataTable rows={facturesRows}>
              <TableHeader name="type" tooltip="Le type de facture">Type</TableHeader>
              <TableHeader name="ht" tooltip="Le prix total hors taxe des factures">Hors taxes</TableHeader>
              <TableHeader name="tva" tooltip="La tva des factures">TVA</TableHeader>
              <TableHeader name="total" tooltip="Le total tout compris des factures">Total</TableHeader>
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
            Résumé des projets
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
              <TableHeader name="ht" tooltip="Le prix total hors taxe des devis">Hors taxes</TableHeader>
              <TableHeader name="tva" tooltip="La tva des devis">TVA</TableHeader>
              <TableHeader name="total" tooltip="Le total tout compris des devis">Total</TableHeader>
            </DataTable>
          </CardText>
          <CardActions border>
            <Button colored ripple component={LinkToIndex}>
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
  currentUser: PropTypes.object,
};

DefaultPage.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

function mapStateToProps() {
  return {
    currentUser: Meteor.user(),
  };
}

export default connect(mapStateToProps)(DefaultPage);

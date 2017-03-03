import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Table, TableHeader, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import moment from 'moment';

import Projects from '../../../common/project/projectSchema';
import Devis from '../../../common/devis/devisSchema';

const PrestaList = ({ prestas, renderAction, ...otherProps }) => (
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>
      Prestas
    </CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={prestas}
        {...otherProps}
      >
        <TableHeader name="id" tooltip="Identifiant de la presta">
          Identifiant
        </TableHeader>
        <TableHeader
          name="idProject"
          tooltip="Projet lié à la presta"
          cellFormatter={(id) => {
            const project = Projects.findOne(id);
            return <Link to={`/project/${id}`}>{project.name}</Link>;
          }}
        >
          Projet
        </TableHeader>
        <TableHeader
          name="idDevis"
          tooltip="Devis lié à la presta"
          cellFormatter={(id) => {
            const devis = Devis.findOne(id);
            if (!devis) return '';
            return <Link to={`/devis/${id}`}>{devis.id}</Link>;
          }}
        >
          Devis
        </TableHeader>
        <TableHeader name="price" tooltip="Prix de la presta">
          Prix
        </TableHeader>
        <TableHeader
          name="sentDate"
          tooltip="Date d'envoi de la presta"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Envoyé le
        </TableHeader>
        <TableHeader
          name="payed"
          tooltip="Est-ce que la presta est réglée?"
          cellFormatter={(payed) => {
            switch (payed) {
              case 'annulé':
                return 'Annulé';
              case 'true':
                return 'Oui';
              default:
              case 'false':
                return 'Non';
            }
          }}
        >
          Réglée?
        </TableHeader>
        <TableHeader name="pricePayed" tooltip="La somme qui a été reçu pour cette presta">
          Versement
        </TableHeader>
        <TableHeader name="delayTillPayed" tooltip="Nombre de jour maximum avant le règlement">
          Délai de règlement
        </TableHeader>
        <TableHeader name="remarque" tooltip="Remarque">
          Remarque
        </TableHeader>
        <TableHeader
          name="payedDate"
          tooltip="Date de reçu du règlement de la presta"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Date de règlement
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>Actions</TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          browserHistory.push('/presta/add');
          return false;
        }}
      >
        Ajouter une presta
      </Button>
    </CardActions>
  </Cell>
);

PrestaList.propTypes = {
  prestas: React.PropTypes.array.isRequired,
  renderAction: React.PropTypes.func.isRequired
};

export default PrestaList;

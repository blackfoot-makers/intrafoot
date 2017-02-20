import React from 'react';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Factures from '../../../common/facture/factureSchema';
import Devis from '../../../common/devis/devisSchema';
import Projects from '../../../common/project/projectSchema';

const FactureShow = ({ params }) => {
  const facture = Factures.findOne(params.factureId);

  if (!facture) {
    return (
      <Cell col={12}>
        Facture introuvable
      </Cell>
    );
  }

  const project = Projects.findOne(facture.idProject);
  const devis = Devis.findOne(facture.idDevis);
  let payed = 'Non';

  switch (facture.payed) {
    case 'true':
      payed = 'Oui';
      break;
    case 'annulé':
      payed = 'Annulé';
      break;
    case 'false':
    default:
      payed = 'Non';
  }

  return (
    <List>
      <ListItem>Identifiant: {facture.id}</ListItem>
      {
        project &&
        <ListItem>Projet lié: <Link to={`/project/${facture.idProject}`}>{project.name}</Link></ListItem>
      }
      {
        devis &&
        <ListItem>Devis lié: <Link to={`/devis/${facture.idDevis}`}>{devis.id}</Link></ListItem>
      }
      <ListItem>Prix: {facture.price}</ListItem>
      {
        facture.sentDate &&
        <ListItem>Envoyé le: {moment(facture.sentDate).format('LL')}</ListItem>
      }
      <ListItem>Réglée?: {payed}</ListItem>
      <ListItem>Versement: {facture.pricePayed || 0}</ListItem>
      <ListItem>Délai de règlement : {facture.delayTillPayed}</ListItem>
      {
        facture.remarque &&
        <ListItem>Remarque: {facture.remarque}</ListItem>
      }
      {
        facture.payedDate &&
        <ListItem>Date de règlement: {moment(facture.payedDate).format('LL')}</ListItem>
      }
    </List>
  );
};

FactureShow.propTypes = {
  params: React.PropTypes.object
};

export default FactureShow;

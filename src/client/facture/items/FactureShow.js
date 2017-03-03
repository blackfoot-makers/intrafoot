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
      <ListItem>Identifiant: <span>{facture.id}</span></ListItem>
      {
        project &&
        <ListItem>Projet lié: <Link to={`/project/${facture.idProject}`}>{project.name}</Link></ListItem>
      }
      {
        devis &&
        <ListItem>Devis lié: <Link to={`/devis/${facture.idDevis}`}>{devis.id}</Link></ListItem>
      }
      <ListItem>Prix: <span>{facture.price}</span></ListItem>
      {
        facture.sentDate &&
        <ListItem>Envoyé le: <span>{moment(facture.sentDate).format('LL')}</span></ListItem>
      }
      <ListItem>Réglée?: <span>{payed}</span></ListItem>
      <ListItem>Versement: <span>{facture.pricePayed || 0}</span></ListItem>
      <ListItem>Délai de règlement: <span>{facture.delayTillPayed}</span></ListItem>
      {
        facture.remarque &&
        <ListItem>Remarque: <span>{facture.remarque}</span></ListItem>
      }
      {
        facture.payedDate &&
        <ListItem>Date de règlement: <span>{moment(facture.payedDate).format('LL')}</span></ListItem>
      }
    </List>
  );
};

FactureShow.propTypes = {
  params: React.PropTypes.object
};

export default FactureShow;

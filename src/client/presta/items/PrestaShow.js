import React from 'react';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Prestas from '../../../common/presta/prestaSchema';
import Devis from '../../../common/devis/devisSchema';
import Projects from '../../../common/project/projectSchema';

const PrestaShow = ({ params }) => {
  const presta = Prestas.findOne(params.prestaId);

  if (!presta) {
    return (
      <Cell col={12}>
        Presta introuvable
      </Cell>
    );
  }

  const project = Projects.findOne(presta.idProject);
  const devis = Devis.findOne(presta.idDevis);
  let payed = 'Non';

  switch (presta.payed) {
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
      <ListItem>Identifiant: <span>{presta.id}</span></ListItem>
      {
        project &&
        <ListItem>Projet lié: <Link to={`/project/${presta.idProject}`}>{project.name}</Link></ListItem>
      }
      {
        devis &&
        <ListItem>Devis lié: <Link to={`/devis/${presta.idDevis}`}>{devis.id}</Link></ListItem>
      }
      <ListItem>Prix: <span>{presta.price}</span></ListItem>
      {
        presta.sentDate &&
        <ListItem>Envoyé le: <span>{moment(presta.sentDate).format('LL')}</span></ListItem>
      }
      <ListItem>Réglée?: <span>{payed}</span></ListItem>
      <ListItem>Versement: <span>{presta.pricePayed || 0}</span></ListItem>
      <ListItem>Délai de règlement: <span>{presta.delayTillPayed}</span></ListItem>
      {
        presta.remarque &&
        <ListItem>Remarque: <span>{presta.remarque}</span></ListItem>
      }
      {
        presta.payedDate &&
        <ListItem>Date de règlement: <span>{moment(presta.payedDate).format('LL')}</span></ListItem>
      }
    </List>
  );
};

PrestaShow.propTypes = {
  params: React.PropTypes.object
};

export default PrestaShow;

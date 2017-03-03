import React from 'react';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Devis from '../../../common/devis/devisSchema';
import Projects from '../../../common/project/projectSchema';

const DevisShow = ({ params }) => {
  const devis = Devis.findOne(params.devisId);

  if (!devis) {
    return (
      <Cell col={12}>
        Devis introuvable
      </Cell>
    );
  }

  const project = Projects.findOne(devis.idProject);

  return (
    <List>
      <ListItem>Identifiant: <span>{devis.id}</span></ListItem>
      {
        project &&
        <ListItem>Projet lié: <Link to={`/project/${devis.idProject}`}>{project.name}</Link></ListItem>
      }
      <ListItem>Prix: <span>{devis.price}</span></ListItem>
      {
        devis.signature &&
        <ListItem>Date de signature: <span>{moment(devis.signature).format('LL')}</span></ListItem>
      }
      <ListItem>Status: <span>{devis.status}</span></ListItem>
      {
        devis.remarque &&
        <ListItem>Remarque: <span>{devis.remarque}</span></ListItem>
      }
      <ListItem>Signé ?: <span>{(devis.signed ? 'oui' : 'non')}</span></ListItem>
    </List>
  );
};

DevisShow.propTypes = {
  params: React.PropTypes.object
};

export default DevisShow;

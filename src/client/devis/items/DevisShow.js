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
      <ListItem>Identifiant: {devis.id}</ListItem>
      {
        project &&
        <ListItem>Projet lié: <Link to={`/project/${devis.idProject}`}>{project.name}</Link></ListItem>
      }
      <ListItem>Prix: {devis.price}</ListItem>
      {
        devis.signature &&
        <ListItem>Date de signature: {moment(devis.signature).format('LL')}</ListItem>
      }
      <ListItem>Status: {devis.status}</ListItem>
      {
        devis.remarque &&
        <ListItem>Remarque: {devis.remarque}</ListItem>
      }
      <ListItem>Signé ?: {(devis.signed ? 'oui' : 'non')}</ListItem>
    </List>
  );
};

DevisShow.propTypes = {
  params: React.PropTypes.object
};

export default DevisShow;

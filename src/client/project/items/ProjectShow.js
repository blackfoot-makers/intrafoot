import React from 'react';
import { List, ListItem, Cell } from 'react-mdl';
import moment from 'moment';

import Projects from '../../../common/project/projectSchema';

const ProjectShow = ({ params }) => {
  const project = Projects.findOne(params.projectId);

  if (!project) {
    return (
      <Cell col={12}>
        Projet introuvable
      </Cell>
    );
  }

  return (
    <List>
      <ListItem>Identifiant: {project.id}</ListItem>
      <ListItem>Entreprise: {project.company}</ListItem>
      <ListItem>Nom: {project.name}</ListItem>
      <ListItem>Description: {project.description}</ListItem>
      {
        project.signature &&
        <ListItem>Date de signature: {moment(project.signature).format('LL')}</ListItem>
      }
      <ListItem>Status: {project.status}</ListItem>
      {
        project.remarque &&
        <ListItem>Remarque: {project.remarque}</ListItem>
      }
      <ListItem>NDA ?: {(project.nda ? 'oui' : 'non')}</ListItem>
    </List>
  );
};

ProjectShow.propTypes = {
  params: React.PropTypes.object
};

export default ProjectShow;

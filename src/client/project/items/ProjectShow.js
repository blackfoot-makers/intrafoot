import React from 'react';
import { List, ListItem, Cell, ListItemContent } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Projects from '../../../common/project/projectSchema';
import Devis from '../../../common/devis/devisSchema';
import Factures from '../../../common/facture/factureSchema';

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
      <ListItem>
        Devis:
        <List>
          {
            project.devis.map((devisId, index) => {
              const devis = Devis.findOne(devisId);
              if (!devis) return '';
              return (
                <ListItem key={index}>
                  <ListItemContent icon="fiber_manual_record"><Link to={`/devis/${devis._id}`}>{devis.id}</Link></ListItemContent>
                </ListItem>
              );
            })
          }
        </List>
      </ListItem>
      <ListItem>
        Factures:
        <List>
          {
            project.factures.map((factureId, index) => {
              const facture = Factures.findOne(factureId);
              if (!facture) return '';
              return (
                <ListItem key={index}>
                  <ListItemContent icon="fiber_manual_record"><Link to={`/facture/${facture._id}`}>{facture.id}</Link></ListItemContent>
                </ListItem>
              );
            })
          }
        </List>
      </ListItem>
    </List>
  );
};

ProjectShow.propTypes = {
  params: React.PropTypes.object
};

export default ProjectShow;

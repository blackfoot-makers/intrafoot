import React, { PureComponent } from 'react';
import { string, shape, func } from 'prop-types';
import { List, ListItem, Cell, ListItemContent } from 'react-mdl';
import { Link } from 'react-router-dom';
import moment from 'moment';

import { requireAuth } from '../../utils';
import Projects from '../../../common/project/projectSchema';
import Devis from '../../../common/devis/devisSchema';
import Factures from '../../../common/facture/factureSchema';
import Users from '../../../common/users/usersSchema';

class ProjectShow extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    const { match: { params } } = this.props;
    const project = Projects.findOne(params.projectId);

    if (!project) {
      return <Cell col={12}>Projet introuvable</Cell>;
    }

    return (
      <List>
        <ListItem>
          Identifiant: <span>{project.id}</span>
        </ListItem>
        <ListItem>
          Entreprise: <span>{project.company}</span>
        </ListItem>
        <ListItem>
          Nom: <span>{project.name}</span>
        </ListItem>
        <ListItem>
          Description: <span>{project.description}</span>
        </ListItem>
        {project.signature &&
          <ListItem>
            Date de signature:{' '}
            <span>{moment(project.signature).format('LL')}</span>
          </ListItem>}
        <ListItem>
          Status: <span>{project.status}</span>
        </ListItem>
        {project.remarque &&
          <ListItem>
            Remarque: <span>{project.remarque}</span>
          </ListItem>}
        <ListItem>
          NDA ?: <span>{project.nda ? 'oui' : 'non'}</span>
        </ListItem>
        <ListItem>
          Participants:
          <List>
            {project.participants &&
              project.participants.map((participantsId, index) => {
                const participant = Users.findOne(participantsId);
                if (!participant) return '';
                return (
                  <ListItem key={index}>
                    <ListItemContent icon="person">
                      <Link to={`/contact/${participant._id}`}>
                        {`${participant.firstName} ${participant.lastName}`}
                      </Link>
                    </ListItemContent>
                  </ListItem>
                );
              })}
          </List>
        </ListItem>
        <ListItem>
          Devis:
          <List>
            {project.devis.map((devisId, index) => {
              const devis = Devis.findOne(devisId);
              if (!devis) return '';
              return (
                <ListItem key={index}>
                  <ListItemContent icon="fiber_manual_record">
                    <Link to={`/devis/${devis._id}`}>
                      {devis.id}
                    </Link>
                  </ListItemContent>
                </ListItem>
              );
            })}
          </List>
        </ListItem>
        <ListItem>
          Factures:
          <List>
            {project.factures.map((factureId, index) => {
              const facture = Factures.findOne(factureId);
              if (!facture) return '';
              return (
                <ListItem key={index}>
                  <ListItemContent icon="fiber_manual_record">
                    <Link to={`/facture/${facture._id}`}>
                      {facture.id}
                    </Link>
                  </ListItemContent>
                </ListItem>
              );
            })}
          </List>
        </ListItem>
      </List>
    );
  }
}

ProjectShow.propTypes = {
  match: shape({
    params: shape({
      projectId: string
    }).isRequired
  }).isRequired,
  history: shape({
    replace: func.isRequired
  }).isRequired
};

export default ProjectShow;

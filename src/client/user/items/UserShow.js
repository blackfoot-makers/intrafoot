import React from 'react';
import { List, ListItem, Cell, ListItemContent, Icon, Tooltip } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Users from '../../../common/users/usersSchema';
import Projects from '../../../common/project/projectSchema';

const UserShow = ({ params }) => {
  const user = Users.findOne(params.contactId);

  if (!user) {
    return (
      <Cell col={12}>
        Contact introuvable
      </Cell>
    );
  }

  const contact = Users.findOne(user.interlocuteur);

  return (
    <List>
      <ListItem>Poste/Entreprise: <span>{user.title} de {user.company}</span></ListItem>
      <ListItem>Nom: <span>{user.firstName} {user.lastName}</span></ListItem>
      {
        user.phone &&
        <ListItem>Téléphone: <span>{user.phone}</span></ListItem>
      }
      <ListItem>Email: <span>{user.email}</span></ListItem>
      {
        contact &&
        <ListItem>Interlocuteur: <Link to={`/contact/${user.interlocuteur}`}>{contact.firstName}</Link></ListItem>
      }
      {
        user.lastContact &&
        <ListItem>Dernier contact: <span>{moment(user.lastContact).format('LL')}</span></ListItem>
      }
      {
        user.projects &&
        <ListItem>
          Projets en commun:
          <List>
            {
              user.projects.map((id, index) => {
                const project = Projects.findOne(id);
                const image = {
                  abandon: {
                    img: 'phonelink_erase',
                    tooltip: 'Abandoné'
                  },
                  'en cours': {
                    img: 'phonelink_setup',
                    tooltip: 'En cours'
                  },
                  'stand by': {
                    img: 'phonelink_lock',
                    tooltip: 'Stand by'
                  },
                  terminé: {
                    img: 'stay_current_portrait',
                    tooltip: 'Terminé'
                  }
                };
                return (
                  <ListItem key={index}>
                    <Tooltip label={image[project.status].tooltip}>
                      <ListItemContent icon={image[project.status].img}>
                        <Link to={`/project/${id}`}>{project.name}</Link>
                      </ListItemContent>
                    </Tooltip>
                  </ListItem>
                );
              })
            }
          </List>
        </ListItem>
      }
      <ListItem>
        {"Facilité d'accès: "}
        {
          Array.from({ length: user.accessLevel }, (elem, key) => <Icon name="star" key={key} />)
        }
        {
          Array.from({ length: 5 - user.accessLevel }, (elem, key) => <Icon name="star_border" key={key} />)
        }
      </ListItem>
      <ListItem>Autre sites:
        <List>
          {
            user.linkedin &&
            <ListItem>{user.linkedin}</ListItem>
          }
          {
            user.sites && user.sites.map((site, index) => (
              <ListItem key={index}>{site}</ListItem>
            ))
          }
        </List>
      </ListItem>
      {
        user.description &&
        <ListItem>Description: <span>{user.description}</span></ListItem>
      }
      <ListItem>Historique: Fonction non implémenté pour le moment</ListItem>
    </List>
  );
};

UserShow.propTypes = {
  params: React.PropTypes.object
};

export default UserShow;

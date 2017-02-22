import React from 'react';
import { List, ListItem, Cell } from 'react-mdl';
import { Link } from 'react-router';
import moment from 'moment';

import Users from '../../../common/users/usersSchema';

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
      <ListItem>Poste/Entreprise: {user.title} de {user.company}</ListItem>
      <ListItem>Nom: {user.firstName} {user.lastName}</ListItem>
      {
        user.phone &&
        <ListItem>Téléphone: {user.phone}</ListItem>
      }
      <ListItem>Email: {user.email}</ListItem>
      {
        contact &&
        <ListItem>Interlocuteur: <Link to={`/contact/${user.interlocuteur}`}>{contact.firstName}</Link></ListItem>
      }
      {
        user.lastContact &&
        <ListItem>Dernier contact: {moment(user.lastContact).format('LL')}</ListItem>
      }
      {
        user.accessLevel &&
        <ListItem>Level {"d'accès"}: {user.accessLevel}</ListItem>
      }
      <ListItem>Autre sites:
        <List>
          {
            user.linkedin &&
            <ListItem>{user.linkedin}</ListItem>
          }
          {
            user.sites && user.sites.map(site => (
              <ListItem>{site}</ListItem>
            ))
          }
        </List>
      </ListItem>
      {
        user.description &&
        <ListItem>Description: {user.description}</ListItem>
      }
      <ListItem>Historique: Fonction non implémenté pour le moment</ListItem>
    </List>
  );
};

UserShow.propTypes = {
  params: React.PropTypes.object
};

export default UserShow;

import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Table, TableHeader, Cell, Card, CardTitle, CardText, CardActions, Button, List, ListItem, ListItemContent, Tooltip } from 'react-mdl';
import moment from 'moment';

import Projects from '../../../common/project/projectSchema';
import Users from '../../../common/users/usersSchema';

const UserList = ({ users, renderAction, ...otherProps }) => (
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>
      Contacts
    </CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={users}
        {...otherProps}
      >
        <TableHeader name="firstName" tooltip="Prénom">
          Prénom
        </TableHeader>
        <TableHeader name="lastName" tooltip="Nom">
          Nom
        </TableHeader>
        <TableHeader
          name="title"
          tooltip="Titre officiel du contact"
        >
          Titre
        </TableHeader>
        <TableHeader
          name="company"
          tooltip="Entreprise"
        >
          Entreprise
        </TableHeader>
        <TableHeader name="phone" tooltip="Numéro de téléphone">
          Téléphone
        </TableHeader>
        <TableHeader name="email" tooltip="Email principale">
          Email
        </TableHeader>
        <TableHeader
          name="projects"
          tooltip="Projet fait avec ce contact"
          cellFormatter={(ids) => {
            if (!ids) return '';
            const projects = ids.map((id, index) => {
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
            });
            return (
              <List>
                {projects}
              </List>
            );
          }}
        >
          Projet
        </TableHeader>
        <TableHeader
          name="interlocuteur"
          tooltip="Principal interlocuteur"
          cellFormatter={(id) => {
            const contact = Users.findOne(id);
            if (contact) return <Link to={`/contact/${id}`}>{contact.firstName}</Link>;
            return '';
          }}
        >
          Interlocuteur
        </TableHeader>
        <TableHeader name="description" tooltip="Remarque sur le contact">
          Description
        </TableHeader>
        <TableHeader name="accessLevel" tooltip="Facilité d'accès (entre 0 et 5)">
          {"Facile d'accès?"}
        </TableHeader>
        <TableHeader
          name="lastContact"
          tooltip="Date du dernier contact"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Dernier contact
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>Actions</TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          browserHistory.push('/contact/add');
          return false;
        }}
      >
        Ajouter un contact
      </Button>
    </CardActions>
  </Cell>
);

UserList.propTypes = {
  users: React.PropTypes.array.isRequired,
  renderAction: React.PropTypes.func.isRequired
};

export default UserList;

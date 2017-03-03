import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Table, TableHeader, Cell, Card, CardTitle, CardText, CardActions, Button, List, ListItem, ListItemContent } from 'react-mdl';
import moment from 'moment';

import Users from '../../../common/users/usersSchema';

const ProjectList = ({ projects, renderAction, ...otherProps }) => (
  <Cell col={12} component={Card} shadow={0}>
    <CardTitle>
      Projets
    </CardTitle>
    <CardText>
      <Table
        sortable
        rowKeyColumn="id"
        shadow={0}
        rows={projects}
        {...otherProps}
      >
        <TableHeader name="id" tooltip="Identifiant du projet">
          Identifiant
        </TableHeader>
        <TableHeader name="name" tooltip="Nom du projet">
          Nom
        </TableHeader>
        <TableHeader name="description" tooltip="Description du projet">
          Description
        </TableHeader>
        <TableHeader name="company" tooltip="Entreprise pour qui le projet est fait">
          Entreprise
        </TableHeader>
        <TableHeader
          name="signature"
          tooltip="Date de signature du projet"
          cellFormatter={date => date && moment(date).format('LL')}
        >
          Signature
        </TableHeader>
        <TableHeader name="status" tooltip="Statut du projet">
          Statut
        </TableHeader>
        <TableHeader name="remarque" tooltip="Remarque sur le projet">
          Remarque
        </TableHeader>
        <TableHeader
          name="participants"
          tooltip="Participants au projet"
          cellFormatter={(userIds) => {
            if (!userIds) return '';
            const users = userIds.map((elem, index) => {
              const user = Users.findOne(elem);
              if (user) {
                return (
                  <ListItem key={index}>
                    <ListItemContent icon="person">
                      <Link to={`/contact/${user._id}`}>
                        {`${user.firstName} ${user.lastName}`}
                      </Link>
                    </ListItemContent>
                  </ListItem>
                );
              }
              return '';
            });
            return (
              <List>
                {users}
              </List>
            );
          }}
        >
          Participants
        </TableHeader>
        <TableHeader
          name="nda"
          tooltip="Le projet est il sous NDA?"
          cellFormatter={nda => (nda ? 'Oui' : 'Non')}
        >
          NDA
        </TableHeader>
        <TableHeader name="action" cellFormatter={renderAction}>Actions</TableHeader>
      </Table>
    </CardText>
    <CardActions border>
      <Button
        colored
        ripple
        onClick={() => {
          browserHistory.push('/project/add');
          return false;
        }}
      >
        Ajouter un projet
      </Button>
    </CardActions>
  </Cell>
);

ProjectList.propTypes = {
  projects: React.PropTypes.array.isRequired,
  renderAction: React.PropTypes.func.isRequired
};

export default ProjectList;

import React from 'react';
import { browserHistory, Link } from 'react-router';
import { Table, TableHeader, Cell, Card, CardTitle, CardText, CardActions, Button } from 'react-mdl';
import moment from 'moment';

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

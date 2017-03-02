import React from 'react';
import { connect } from 'react-redux';
import { Table, TableHeader } from 'react-mdl';
import moment from 'moment';

import Users from '../../common/users/usersSchema';

const History = ({ history }) => (
  <Table
    sortable
    rowKeyColumn="date"
    shadow={0}
    rows={history}
  >
    <TableHeader
      name="date"
      tooltip="Date à laquelle l'action a été effectuée"
      cellFormatter={date => date && (`${moment(date).format('LL')} ${moment(date).format('LTS')}`)}
    >
      Date
    </TableHeader>
    <TableHeader
      name="user"
      tooltip="Utilisateur"
      cellFormatter={(userId) => {
        const user = Users.findOne({ id: userId });
        if (user) {
          return `${user.firstName} ${user.lastName}`;
        }
        return '';
      }}
    >
      Utilisateur
    </TableHeader>
    <TableHeader
      name="doc"
      tooltip="Type d'action"
    >
      {"Type d'action"}
    </TableHeader>
    <TableHeader
      name="action"
      tooltip="Action"
    >
      Action
    </TableHeader>
  </Table>
);

History.propTypes = {
  history: React.PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  history: state.history
});

export default connect(mapStateToProps)(History);

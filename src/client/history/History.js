import React, { PureComponent } from 'react';
import { array, shape, func } from 'prop-types';
import { connect } from 'react-redux';
import { Table, TableHeader } from 'react-mdl';
import moment from 'moment';

import { requireAuth } from '../utils';
import Users from '../../common/users/usersSchema';

class History extends PureComponent {
  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  render() {
    const { histories } = this.props;

    return (
      <Table sortable rowKeyColumn="date" shadow={0} rows={histories}>
        <TableHeader
          name="date"
          tooltip="Date à laquelle l'action a été effectuée"
          cellFormatter={date =>
            date &&
            `${moment(date).format('LL')} ${moment(date).format('LTS')}`}
        >
          Date
        </TableHeader>
        <TableHeader
          name="user"
          tooltip="Utilisateur"
          cellFormatter={userId => {
            const user = Users.findOne({ id: userId });
            if (user) {
              return `${user.firstName} ${user.lastName}`;
            }
            return '';
          }}
        >
          Utilisateur
        </TableHeader>
        <TableHeader name="doc" tooltip="Type d'action">
          {"Type d'action"}
        </TableHeader>
        <TableHeader name="action" tooltip="Action">
          Action
        </TableHeader>
      </Table>
    );
  }
}

History.propTypes = {
  histories: array.isRequired,
  history: shape({
    replace: func.isRequired
  }).isRequired
};

const mapStateToProps = state => ({
  histories: state.history
});

export default connect(mapStateToProps)(History);

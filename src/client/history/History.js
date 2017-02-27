import React from 'react';
import { connect } from 'react-redux';
import { Table, TableHeader } from 'react-mdl';
import moment from 'moment';


const History = ({ history }) => (
  <Table
    sortable
    rowKeyColumn="id"
    shadow={0}
    rows={history}
  >
    <TableHeader
      name="user"
      tooltip="Utilisateur"
    >
      Utilisateur
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

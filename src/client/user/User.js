import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, IconButton } from 'react-mdl';

import UserList from './items/UserList';
import UserAdd from './items/UserAdd';

import { deleteUser } from './userActions';

// Users component - represents the users lists
class Users extends Component {

  constructor(props) {
    super(props);
    this.deleteAUser = this.deleteAUser.bind(this);
    this.renderAction = this.renderAction.bind(this);

    this.state = {
      editMode: false,
      width: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  deleteAUser(id) {
    this.props.deleteUser(id);
  }

  renderAction(data) {
    return (
      <div>
        <IconButton name="fullscreen" onClick={() => browserHistory.push(`/contact/${data._id}`)} />
        <IconButton name="edit" onClick={() => browserHistory.push(`/contact/edit/${data._id}`)} />
        <IconButton
          name="delete"
          onClick={() => {
            this.props.deleteUser(data._id);
          }}
        />
      </div>
    );
  }

  render() {
    const users = this.props.users.map(data => ({
      action: data,
      ...data
    }));

    if (this.state.editMode) {
      return (
        <Grid>
          <UserAdd {...this.state.editMode} editMode />
        </Grid>
      );
    }

    return (
      <Grid style={{ width: this.state.width - (16 + 16) }}>
        <UserList
          users={users}
          renderAction={this.renderAction}
          width={this.state.width}
        />
      </Grid>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired,
  deleteUser: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users && state.users.allUsers
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: (id) => {
      dispatch(deleteUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

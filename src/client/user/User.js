import React, { PureComponent } from 'react';
import { array, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Grid, IconButton } from 'react-mdl';
import { bind } from 'decko';

import { requireAuth } from '../utils';
import UserList from './items/UserList';
import UserAdd from './items/UserAdd';

import { deleteUser } from './userActions';

// Users component - represents the users lists
class Users extends PureComponent {
  state = {
    editMode: false,
    width: 0
  };

  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  @bind
  updateWindowDimensions() {
    this.setState(state => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight
    }));
  }

  @bind
  deleteAUser(id) {
    this.props.deleteUser(id);
  }

  @bind
  renderAction(data) {
    return (
      <div>
        <IconButton
          name="fullscreen"
          onClick={() => this.props.history.push(`/contact/${data._id}`)}
        />
        <IconButton
          name="edit"
          onClick={() => this.props.history.push(`/contact/edit/${data._id}`)}
        />
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
          history={this.props.history}
        />
      </Grid>
    );
  }
}

Users.propTypes = {
  users: array.isRequired,
  deleteUser: func.isRequired,
  history: shape({
    replace: func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    users: state.users && state.users.allUsers,
    routing: state.routing
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteUser: id => {
      dispatch(deleteUser(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Users);

import React, { PureComponent } from 'react';
import { object, bool, func } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { bind } from 'decko';

import LoginFormAccount from './items/LoginFormAccount';
import EditForm from './items/EditForm';

import { editUser } from './accountActions';

class LoginForm extends PureComponent {
  state = {
    editMode: this.props.editMode || false
  };

  getChildContext() {
    return {
      muiTheme: getMuiTheme()
    };
  }

  @bind
  onEditClick() {
    this.setState({
      editMode: true
    });
  }

  render() {
    if (this.state.editMode) {
      return (
        <EditForm
          currentUser={Meteor.user().profile}
          onSubmit={this.props.editUser}
        />
      );
    }
    return <LoginFormAccount onEditClick={this.onEditClick} />;
  }
}

LoginForm.childContextTypes = {
  muiTheme: object
};

LoginForm.propTypes = {
  editMode: bool,
  editUser: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  editUser: newUser => {
    dispatch(editUser(newUser));
  }
});

export default connect(null, mapDispatchToProps)(LoginForm);

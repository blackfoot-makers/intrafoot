import React from 'react';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import LoginFormAccount from './items/LoginFormAccount';
import EditForm from './items/EditForm';

import { editUser } from './accountActions';

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.onEditClick = this._onEditClick.bind(this);
    this.state = {
      editMode: this.props.editMode || false
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  componentDidMount() {
    console.log('MOUNTING WITH USER', Meteor.user());
  }

  _onEditClick() {
    console.log('ONEDIT CLICK ');
    this.setState({
      editMode: true
    });
  }

  render() {
    // const className = this.props.user ? 6 : 12;

    console.log('LOGGIN USER IS ', Meteor.user());
    if (this.state.editMode) {
      return (
        <EditForm currentUser={Meteor.user().profile} onSubmit={this.props.editUser} />
      );
    }
    return (
      <LoginFormAccount onEditClick={this.onEditClick} />
    );
  }
}

LoginForm.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

LoginForm.propTypes = {
  editMode: React.PropTypes.bool,
  editUser: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  editUser: (newUser) => {
    dispatch(editUser(newUser));
  }
});

export default connect(null, mapDispatchToProps)(LoginForm);

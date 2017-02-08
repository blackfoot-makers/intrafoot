import React from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

class LoginFormAccount extends Accounts.ui.LoginForm {

  fields() {
    const { formState } = this.state;

    if (formState === STATES.SIGN_UP) {
      const oldFields = super.fields();
      const newFileds = {
        ...oldFields,
        firstname: {
          id: 'firstname',
          hint: 'Prénom',
          label: 'Prénom',
          // required: true,
          // defaultValue: '',
          onChange: this.handleChange.bind(this, 'firstname'),
          // message: super.getMessageForField('username'),
        },
        lastname: {
          id: 'lastname',
          hint: 'Nom',
          label: 'Nom',
          // required: true,
          // defaultValue: '',
          onChange: this.handleChange.bind(this, 'lastname'),
          // message: super.getMessageForField('username'),
        },
      };

      return newFileds;
    }
    return super.fields();
  }

  signUp(options = {}) {
    const { firstname = '', lastname = '' } = this.state;
    const opt = options;

    opt.profile = Object.assign(opt.profile || {}, {
      firstname,
      lastname,
    });
    super.signUp(options);
  }
}

class LoginForm extends React.Component {
  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  render() {
    return (
      <div className="mdl-grid">
        <LoginFormAccount />
      </div>
    );
  }
}

LoginForm.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

export default LoginForm;

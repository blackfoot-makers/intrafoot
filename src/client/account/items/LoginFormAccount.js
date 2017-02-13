import React from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';

class LoginFormAccount extends Accounts.ui.LoginForm {

  fields() {
    const { formState } = this.state;

    if (formState === STATES.SIGN_UP) {
      const oldFields = super.fields();
      const newFileds = {
        ...oldFields,
        firstName: {
          id: 'firstName',
          hint: 'Prénom',
          label: 'Prénom',
          onChange: this.handleChange.bind(this, 'firstName'),
        },
        lastName: {
          id: 'lastName',
          hint: 'Nom',
          label: 'Nom',
          onChange: this.handleChange.bind(this, 'lastName'),
        },
        title: {
          id: 'title',
          hint: 'Titre',
          label: 'Titre',
          onChange: this.handleChange.bind(this, 'title'),
        },
        company: {
          id: 'company',
          hint: 'Entreprise',
          label: 'Entreprise',
          onChange: this.handleChange.bind(this, 'company'),
        },
      };

      return newFileds;
    }
    return super.fields();
  }

  signUp(options = {}) {
    const { firstName = '', lastName = '', email = '', title = '', company = '' } = this.state;
    const opt = options;

    opt.profile = Object.assign(opt.profile || {}, {
      firstName,
      lastName,
      email,
      title,
      company
    });
    super.signUp(options);
  }

  render() {
    const { formState } = this.state;

    return (
      <div className="mdl-grid">
        {
          super.render()
        }
        {
          formState === STATES.PROFILE &&
          <button
            className="mdl-button mdl-js-button mdl-js-ripple-effect"
            style={{ marginTop: 10 }}
            onClick={this.props.onEditClick}
          >
              EDITION DE PROFILE
          </button>
        }
      </div>
    );
  }
}

export default LoginFormAccount;

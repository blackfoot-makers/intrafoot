import React from 'react';
import { Accounts, STATES } from 'meteor/std:accounts-ui';
import { Meteor } from 'meteor/meteor';
import { connect } from 'react-redux';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

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
            onClick={event => this.props.onEditClick(event, this.state.user.profile)}
          >
              EDITION DE PROFILE
          </button>
        }
      </div>
    );
  }
}

class LoginForm extends React.Component {

  constructor(props) {
    super(props);

    this.onEditClick = this._onEditClick.bind(this);
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  componentDidMount() {
    console.log('MOUNTING WITH USER', Meteor.user());
    // if (Meteor.user()) {
    //   console.log("GETTING USER");
    //   this.props.getUser();
    // }
  }

  _onEditClick(event, user) {
    console.log('ONEDIT CLICK ', event, user);
  }

  render() {
    // const className = this.props.user ? 6 : 12;

    console.log('LOGGIN USER IS ', this.props.user, Meteor.user());
    return (
      <LoginFormAccount onEditClick={this.onEditClick} />
    );
  }
}

LoginForm.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

LoginForm.propTypes = {
  user: React.PropTypes.object
};

const mapStateToProps = () => ({
  user: Meteor.user()
});


export default connect(mapStateToProps)(LoginForm);

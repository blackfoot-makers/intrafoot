import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Roles } from 'meteor/alanning:roles';
import { Accounts } from 'meteor/std:accounts-ui';
import { T9n } from 'meteor/softwarerero:accounts-t9n';

// React-mdl classes
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';

// import config from '../../config.json';

import createStore from '../../src/client/createStore';
import App from '../../src/client/containers/App';
import DefaultPage from '../../src/client/views/defaultPage';
import LoginForm from '../../src/client/account/LoginForm';
import Project from '../../src/client/project/Project';

T9n.setLanguage('fr');

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  requireEmailVerification: true
});

function requireAuth(nextState, replace) {
  const currentUser = Meteor.user();

  if (!currentUser || !Roles.userIsInRole(currentUser, 'admin')) {
    replace({
      pathname: '/user',
      state: { nextPathname: nextState.location.pathname }
    });
  } else if (currentUser && !currentUser.emails[0].verified) {
    const message = 'You must verify your email address before you can log in';
    const notification = document.getElementById('snackbarIntraFoot');
    const data = {
      message
    };

    notification.MaterialSnackbar.showSnackbar(data);
    throw new Meteor.Error(403, message);
  }
}

const Root = (props) => {
  const history = syncHistoryWithStore(browserHistory, props.store);

  return (
    <Provider store={props.store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/user" component={LoginForm} />
          <Route path="/project" component={Project} onEnter={requireAuth} />
          <IndexRoute component={DefaultPage} onEnter={requireAuth} />
        </Route>
      </Router>
    </Provider>
  );
};

Root.propTypes = {
  store: React.PropTypes.shape({
    subscribe: React.PropTypes.func.isRequired,
    dispatch: React.PropTypes.func.isRequired,
    getState: React.PropTypes.func.isRequired
  })
};

Meteor.startup(() => {
  // Remove first to dodge multiple key error
  // Accounts.loginServiceConfiguration.remove({
  //   service: 'google'
  // });
  // Accounts.loginServiceConfiguration.insert(config.google);
  injectTapEventPlugin();
  const store = createStore();

  render(
    <Root store={store} />,
    document.getElementById('app')
  );
});

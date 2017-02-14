import React from 'react';
import { Meteor } from 'meteor/meteor';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { syncHistoryWithStore } from 'react-router-redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

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

T9n.setLanguage('fr');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
});

function requireAuth(nextState, replace) {
  if (!Meteor.user()) {
    replace({
      pathname: '/user',
      state: { nextPathname: nextState.location.pathname }
    });
  }
}

const Root = (props) => {
  const history = syncHistoryWithStore(browserHistory, props.store);

  return (
    <Provider store={props.store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="/user" component={LoginForm} />
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

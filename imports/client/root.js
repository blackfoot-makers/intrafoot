import React from 'react';
import { render } from 'react-dom';
import { shape, func, object } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';
import { Route } from 'react-router-dom';
import createHistory from 'history/createBrowserHistory';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Accounts } from 'meteor/std:accounts-ui';
import { T9n } from 'meteor/softwarerero:accounts-t9n';

// React-mdl classes
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'react-datepicker/dist/react-datepicker.css';

import './createMomentLocal';

import createStore from '../../src/client/createStore';
import App from '../../src/client/containers/App';

T9n.setLanguage('fr');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  requireEmailVerification: true
});

const Root = ({ store, history }) =>
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Route path="/" component={App} />
    </ConnectedRouter>
  </Provider>;

Root.propTypes = {
  store: shape({
    subscribe: func.isRequired,
    dispatch: func.isRequired,
    getState: func.isRequired
  }),
  history: object.isRequired
};

Meteor.startup(() => {
  injectTapEventPlugin();
  const history = createHistory();
  const store = createStore(history);
  render(
    <Root store={store} history={history} />,
    document.getElementById('app')
  );
});

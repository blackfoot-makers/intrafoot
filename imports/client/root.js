import React from 'react';
import { render } from 'react-dom';
import { shape, func } from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { Provider } from 'react-redux';
import injectTapEventPlugin from 'react-tap-event-plugin';

import { Accounts } from 'meteor/std:accounts-ui';
import { T9n } from 'meteor/softwarerero:accounts-t9n';

// React-mdl classes
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'react-datepicker/dist/react-datepicker.css';

import './createMomentLocal';

import createStore from '../../src/client/createStore';
import Router from '../../src/client/containers/routes';

T9n.setLanguage('fr');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  requireEmailVerification: true
});

const Root = ({ store }) =>
  <Provider store={store}>
    <Router />
  </Provider>;

Root.propTypes = {
  store: shape({
    subscribe: func.isRequired,
    dispatch: func.isRequired,
    getState: func.isRequired
  })
};

Meteor.startup(() => {
  injectTapEventPlugin();
  const store = createStore();
  render(<Root store={store} />, document.getElementById('app'));
});

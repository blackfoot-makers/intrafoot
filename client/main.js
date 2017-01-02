// Import client startup through a single index entry point
import { Meteor } from 'meteor/meteor';
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { Accounts } from 'meteor/std:accounts-ui';

import createStore from '../src/createStore';
import App from '../src/App';

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_ONLY',
});

Meteor.startup(() => {
  render((
    <Provider store={createStore()}>
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </Provider>
  ), document.getElementById('app'));
});

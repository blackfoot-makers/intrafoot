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
import 'react-datepicker/dist/react-datepicker.css';

import './createMomentLocal';
// import config from '../../config.json';

import createStore from '../../src/client/createStore';
import App from '../../src/client/containers/App';
import DefaultPage from '../../src/client/views/defaultPage';
import LoginForm from '../../src/client/account/LoginForm';
import User from '../../src/client/user/User';
import UserAdd from '../../src/client/user/items/UserAdd';
import UserShow from '../../src/client/user/items/UserShow';
import Project from '../../src/client/project/Project';
import ProjectAdd from '../../src/client/project/items/ProjectAdd';
import ProjectShow from '../../src/client/project/items/ProjectShow';
import Devis from '../../src/client/devis/Devis';
import DevisAdd from '../../src/client/devis/items/DevisAdd';
import DevisShow from '../../src/client/devis/items/DevisShow';
import Facture from '../../src/client/facture/Facture';
import FactureAdd from '../../src/client/facture/items/FactureAdd';
import FactureShow from '../../src/client/facture/items/FactureShow';
import Presta from '../../src/client/presta/Presta';
import PrestaAdd from '../../src/client/presta/items/PrestaAdd';
import PrestaShow from '../../src/client/presta/items/PrestaShow';
import History from '../../src/client/history/History';

T9n.setLanguage('fr');

Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL',
  requireEmailVerification: true
});

function redirectToLogin(message, replace, nextState) {
  const notification = document.getElementById('snackbarIntraFoot');

  if (notification) {
    notification.MaterialSnackbar.showSnackbar({
      message
    });
  }

  replace({
    pathname: '/user',
    state: { nextPathname: nextState.location.pathname }
  });
}
function requireAuth(nextState, replace) {
  const currentUser = Meteor.user();

  if (!currentUser || !Roles.userIsInRole(currentUser, 'admin')) {
    redirectToLogin('You must be a Blackfoot employee to access this page', replace, nextState);
  } else if (currentUser && !currentUser.emails[0].verified) {
    redirectToLogin('You must verify your email address before you can log in', replace, nextState);
  }
}

const Root = (props) => {
  const history = syncHistoryWithStore(browserHistory, props.store);

  return (
    <Provider store={props.store}>
      <Router history={history}>
        <Route path="/" component={App}>
          <Route path="user" component={LoginForm} />
          <Route path="contact" component={User} onEnter={requireAuth} />
          <Route path="contact/add" component={UserAdd} onEnter={requireAuth} />
          <Route path="contact/edit/:contactId" component={UserAdd} onEnter={requireAuth} />
          <Route path="contact/:contactId" component={UserShow} onEnter={requireAuth} />
          <Route path="project" component={Project} onEnter={requireAuth} />
          <Route path="project/add" component={ProjectAdd} onEnter={requireAuth} />
          <Route path="project/edit/:projectId" component={ProjectAdd} onEnter={requireAuth} />
          <Route path="project/:projectId" component={ProjectShow} onEnter={requireAuth} />
          <Route path="devis" component={Devis} onEnter={requireAuth} />
          <Route path="devis/add" component={DevisAdd} onEnter={requireAuth} />
          <Route path="devis/edit/:devisId" component={DevisAdd} onEnter={requireAuth} />
          <Route path="devis/:devisId" component={DevisShow} onEnter={requireAuth} />
          <Route path="facture" component={Facture} onEnter={requireAuth} />
          <Route path="facture/add" component={FactureAdd} onEnter={requireAuth} />
          <Route path="facture/edit/:factureId" component={FactureAdd} onEnter={requireAuth} />
          <Route path="facture/:factureId" component={FactureShow} onEnter={requireAuth} />
          <Route path="presta" component={Presta} onEnter={requireAuth} />
          <Route path="presta/add" component={PrestaAdd} onEnter={requireAuth} />
          <Route path="presta/edit/:prestaId" component={PrestaAdd} onEnter={requireAuth} />
          <Route path="presta/:prestaId" component={PrestaShow} onEnter={requireAuth} />
          <Route path="history" component={History} onEnter={requireAuth} />
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

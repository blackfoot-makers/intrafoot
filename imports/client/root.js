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

import moment from 'moment';

// React-mdl classes
import 'react-mdl/extra/material.css';
import 'react-mdl/extra/material.js';
import 'react-datepicker/dist/react-datepicker.css';

// import config from '../../config.json';

import createStore from '../../src/client/createStore';
import App from '../../src/client/containers/App';
import DefaultPage from '../../src/client/views/defaultPage';
import LoginForm from '../../src/client/account/LoginForm';
import Project from '../../src/client/project/Project';
import ProjectAdd from '../../src/client/project/items/ProjectAdd';
import ProjectShow from '../../src/client/project/items/ProjectShow';
import Devis from '../../src/client/devis/Devis';
import DevisAdd from '../../src/client/devis/items/DevisAdd';


moment.locale('fr', {
  months: 'janvier_février_mars_avril_mai_juin_juillet_août_septembre_octobre_novembre_décembre'.split('_'),
  monthsShort: 'janv._févr._mars_avr._mai_juin_juil._août_sept._oct._nov._déc.'.split('_'),
  weekdays: 'dimanche_lundi_mardi_mercredi_jeudi_vendredi_samedi'.split('_'),
  weekdaysShort: 'dim._lun._mar._mer._jeu._ven._sam.'.split('_'),
  weekdaysMin: 'Di_Lu_Ma_Me_Je_Ve_Sa'.split('_'),
  longDateFormat: {
    LT: 'HH:mm',
    LTS: 'HH:mm:ss',
    L: 'DD/MM/YYYY',
    LL: 'D MMMM YYYY',
    LLL: 'D MMMM YYYY LT',
    LLLL: 'dddd D MMMM YYYY LT'
  },
  calendar: {
    sameDay: '[Aujourd\'hui à] LT',
    nextDay: '[Demain à] LT',
    nextWeek: 'dddd [à] LT',
    lastDay: '[Hier à] LT',
    lastWeek: 'dddd [dernier à] LT',
    sameElse: 'L'
  },
  relativeTime: {
    future: 'dans %s',
    past: 'il y a %s',
    s: 'quelques secondes',
    m: 'une minute',
    mm: '%d minutes',
    h: 'une heure',
    hh: '%d heures',
    d: 'un jour',
    dd: '%d jours',
    M: 'un mois',
    MM: '%d mois',
    y: 'une année',
    yy: '%d années'
  },
  ordinalParse: /\d{1,2}(er|ème)/,
  ordinal: (number) => (
     number + (number === 1 ? 'er' : 'ème')
  ),
  meridiemParse: /PD|MD/,
  isPM: (input) => (
     input.charAt(0) === 'M'
  ),
  // in case the meridiem units are not separated around 12, then implement
  // this function (look at locale/id.js for an example)
  // meridiemHour : function (hour, meridiem) {
  //     return /* 0-23 hour, given meridiem token and hour 1-12 */
  // },
  meridiem: (hours, minutes, isLower) => (
      hours < 12 ? 'PD' : 'MD'
  ),
  week: {
    dow: 1, // Monday is the first day of the week.
    doy: 4  // The week that contains Jan 4th is the first week of the year.
  }
});

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
          <Route path="/user" component={LoginForm} />
          <Route path="/project" component={Project} onEnter={requireAuth} />
          <Route path="/project/:projectId" component={ProjectShow} onEnter={requireAuth} />
          <Route path="/project/add" component={ProjectAdd} onEnter={requireAuth} />
          <Route path="/project/edit/:projectId" component={ProjectAdd} onEnter={requireAuth} />
          <Route path="/devis" component={Devis} onEnter={requireAuth} />
          <Route path="/devis/add" component={DevisAdd} onEnter={requireAuth} />
          <Route path="/devis/edit/:devisId" component={DevisAdd} onEnter={requireAuth} />
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

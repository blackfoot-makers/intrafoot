import React from 'react';
import { Link } from 'react-router';

export default () => (
  <header className="mdl-layout__header">
    <div className="mdl-layout__header-row">
      <span className="mdl-layout-title">Intrafoot</span>
      <div className="mdl-layout-spacer" />
      {
        Meteor.user() &&
        <nav className="mdl-navigation">
          <Link className="mdl-navigation__link" to="/user" >
            <span className="mdl-badge" data-badge={Meteor.user().profile.notifications}>
              { Meteor.user().username }
            </span>
          </Link>
        </nav>
      }
    </div>
  </header>
);

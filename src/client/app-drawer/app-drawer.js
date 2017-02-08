import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink } from 'react-router';
// import { isLoggedIn } from '../../selectors/user-selectors'
//
// const mapStateToProps = (state) => ({
//   isLoggedIn: isLoggedIn(state)
// })

const AppDrawer = (/* { isLoggedIn } */) => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">IntraFoot</span>
    <nav className="mdl-navigation">
      <IndexLink className="mdl-navigation__link" to="/">Dashboard</IndexLink>
      <Link className="mdl-navigation__link" to="/user">Utilisateur</Link>
    </nav>
  </div>
);

export default connect(null)(AppDrawer);

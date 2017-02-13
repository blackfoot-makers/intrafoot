import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink, browserHistory } from 'react-router';
// import { isLoggedIn } from '../../selectors/user-selectors'
//
// const mapStateToProps = (state) => ({
//   isLoggedIn: isLoggedIn(state)
// })

const AppDrawer = ({ currentUser }) => (
  <div className="mdl-layout__drawer">
    <span className="mdl-layout-title">IntraFoot</span>
    <nav className="mdl-navigation">
      <IndexLink className="mdl-navigation__link" to="/">Dashboard</IndexLink>
      <Link className="mdl-navigation__link" to="/user">Utilisateur</Link>
      {
        currentUser &&
        <button
          className="mdl-button mdl-js-button mdl-button--raised mdl-button--colored"
          onClick={() => Meteor.logout(() => {
            console.log('LOGOUT OF STUFF');
            browserHistory.push('/logout');
          })}
        >
          Logout
        </button>
      }

    </nav>
  </div>
);

AppDrawer.propTypes = {
  currentUser: React.PropTypes.object
};

const mapStateToProps = () => ({
  currentUser: Meteor.user()
});

export default connect(mapStateToProps)(AppDrawer);

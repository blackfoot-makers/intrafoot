import React from 'react';
import { connect } from 'react-redux';
import { Link, IndexLink, browserHistory } from 'react-router';
import { Drawer, Navigation, Button } from 'react-mdl';

const AppDrawer = ({ currentUser }) => (
  <Drawer title="IntraFoot">
    <Navigation>
      <IndexLink to="/">Dashboard</IndexLink>
      <Link to="/user">Utilisateur</Link>
      {
        currentUser &&
        <Button
          onClick={() => Meteor.logout(() => {
            browserHistory.push('/user');
          })}
        >
          Se déconnecter
        </Button>
      }
    </Navigation>
  </Drawer>
);

AppDrawer.propTypes = {
  currentUser: React.PropTypes.object
};

const mapStateToProps = () => ({
  currentUser: Meteor.user()
});

export default connect(mapStateToProps)(AppDrawer);

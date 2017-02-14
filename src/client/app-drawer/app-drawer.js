import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Drawer, Navigation, Button } from 'react-mdl';

import { LinkToUser, LinkToIndex, LinkToProject } from '../common/Links';

const AppDrawer = ({ currentUser }) => (
  <Drawer title="IntraFoot">
    <Navigation>
      <LinkToIndex>Dashboard</LinkToIndex>
      <LinkToUser>Utilisateur</LinkToUser>
      <LinkToProject>Les projets</LinkToProject>
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

import React from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Drawer, Navigation, Button } from 'react-mdl';

import {
  LinkToUser,
  LinkToIndex,
  LinkToProject,
  LinkToDevis,
  LinkToFacture,
  LinkToContact,
  LinkToHistory,
  LinkToPresta
} from '../../common/Links';

const AppDrawer = ({ currentUser }) => (
  <Drawer title="IntraFoot">
    <Navigation>
      <LinkToIndex>Dashboard</LinkToIndex>
      <LinkToUser>{currentUser ? 'Mon profile' : 'Se connecter'}</LinkToUser>
      <LinkToProject>Les projets</LinkToProject>
      <LinkToDevis>Les devis</LinkToDevis>
      <LinkToFacture>Les factures</LinkToFacture>
      <LinkToPresta>Les prestataires</LinkToPresta>
      <LinkToContact>Networking</LinkToContact>
      <LinkToHistory>Historique</LinkToHistory>
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

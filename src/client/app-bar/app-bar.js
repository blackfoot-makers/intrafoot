import React from 'react';
import { Link } from 'react-router';
import { Header, Navigation, Badge } from 'react-mdl';

export default () => (
  <Header title="Intrafoot">
    {
      Meteor.user() &&
      <Navigation>
        <Link to="/user" >
          <Badge text="4">
            { Meteor.user().username }
          </Badge>
        </Link>
      </Navigation>
    }
  </Header>
);

import React from 'react';
import { Header, Navigation, Badge } from 'react-mdl';

import { LinkToUser } from '../../common/Links';

export default () => (
  <Header title="Intrafoot">
    {
      Meteor.user() &&
      <Navigation>
        <LinkToUser>
          <Badge text="4">
            { Meteor.user().username }
          </Badge>
        </LinkToUser>
      </Navigation>
    }
  </Header>
);

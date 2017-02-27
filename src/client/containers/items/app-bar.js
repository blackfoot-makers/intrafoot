import React from 'react';
import { Header, Navigation, Badge } from 'react-mdl';

import { LinkToUser } from '../../common/Links';
import SearchField from '../../common/SearchField';

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
    {
      Meteor.user() &&
      <SearchField />
    }
  </Header>
);

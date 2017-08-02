import React from 'react';
import { string } from 'prop-types';
import { Header, Navigation, Badge } from 'react-mdl';

import { LinkToUser } from '../../common/Links';
import SearchField from '../../common/SearchField';

const AppBar = ({ subTitle }) =>
  <Header
    title={
      subTitle
        ? <span>
          <strong>Intrafoot</strong>
          <span>
            {' '}/ {subTitle}
          </span>
        </span>
        : <span>Intrafoot</span>
    }
  >
    {Meteor.user() &&
      <Navigation>
        <LinkToUser>
          <Badge text="4">
            {Meteor.user().username}
          </Badge>
        </LinkToUser>
      </Navigation>}
    {Meteor.user() && <SearchField />}
  </Header>;

AppBar.propTypes = {
  subTitle: string
};

export default AppBar;

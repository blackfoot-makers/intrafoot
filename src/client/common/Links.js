import React from 'react';
import { Link, IndexLink } from 'react-router';

const LinkToProject = ({ children, ...otherProps }) => (
  <Link to="/project" {...otherProps}>
    { children }
  </Link>
);

LinkToProject.propTypes = {
  children: React.PropTypes.node.isRequired
};

const LinkToUser = ({ children, ...otherProps }) => (
  <Link to="/user" {...otherProps}>
    { children }
  </Link>
);

LinkToUser.propTypes = {
  children: React.PropTypes.node.isRequired
};

const LinkToIndex = ({ children, ...otherProps }) => (
  <IndexLink to="/" {...otherProps}>
    { children }
  </IndexLink>
);

LinkToIndex.propTypes = {
  children: React.PropTypes.node.isRequired
};

export {
  LinkToProject,
  LinkToIndex,
  LinkToUser
};
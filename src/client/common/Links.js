import React from 'react';
import { node } from 'prop-types';
import { Link, NavLink } from 'react-router-dom';

const LinkToProject = ({ children, ...otherProps }) =>
  <Link to="/project" {...otherProps}>
    {children}
  </Link>;

LinkToProject.propTypes = {
  children: node.isRequired
};

const LinkToDevis = ({ children, ...otherProps }) =>
  <Link to="/devis" {...otherProps}>
    {children}
  </Link>;

LinkToDevis.propTypes = {
  children: node.isRequired
};

const LinkToFacture = ({ children, ...otherProps }) =>
  <Link to="/facture" {...otherProps}>
    {children}
  </Link>;

LinkToFacture.propTypes = {
  children: node.isRequired
};

const LinkToUser = ({ children, ...otherProps }) =>
  <Link to="/user" {...otherProps}>
    {children}
  </Link>;

LinkToUser.propTypes = {
  children: node.isRequired
};

const LinkToContact = ({ children, ...otherProps }) =>
  <Link to="/contact" {...otherProps}>
    {children}
  </Link>;

LinkToContact.propTypes = {
  children: node.isRequired
};

const LinkToHistory = ({ children, ...otherProps }) =>
  <Link to="/history" {...otherProps}>
    {children}
  </Link>;

LinkToHistory.propTypes = {
  children: node.isRequired
};

const LinkToPresta = ({ children, ...otherProps }) =>
  <Link to="/presta" {...otherProps}>
    {children}
  </Link>;

LinkToPresta.propTypes = {
  children: node.isRequired
};

const LinkToIndex = ({ children, ...otherProps }) =>
  <NavLink exact to="/" {...otherProps}>
    {children}
  </NavLink>;

LinkToIndex.propTypes = {
  children: node.isRequired
};

export {
  LinkToPresta,
  LinkToContact,
  LinkToProject,
  LinkToIndex,
  LinkToUser,
  LinkToDevis,
  LinkToFacture,
  LinkToHistory
};

import React from 'react';
import { Layout, Content, Grid } from 'react-mdl';

import AppBar from './items/app-bar';
import AppDrawer from './items/app-drawer';
import AppFooter from './items/app-footer';

const App = ({ children, location }) => (
  <Layout fixedHeader>
    <AppBar />
    <AppDrawer />
    <Content component={Grid}>
      { children }
    </Content>
    <AppFooter location={location} />
    <div
      aria-live="assertive"
      aria-atomic="true"
      aria-relevant="text"
      className="mdl-snackbar mdl-js-snackbar"
      id="snackbarIntraFoot"
    >
      <div className="mdl-snackbar__text" />
      <button type="button" className="mdl-snackbar__action" />
    </div>
  </Layout>
);

App.propTypes = {
  children: React.PropTypes.node.isRequired,
  location: React.PropTypes.object
};

export default App;

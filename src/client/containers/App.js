import React from 'react';
import { Layout, Content, Grid } from 'react-mdl';

import AppBar from '../app-bar/app-bar';
import AppDrawer from '../app-drawer/app-drawer';

const App = props => (
  <Layout fixedHeader>
    <AppBar />
    <AppDrawer />
    <Content component={Grid}>
      { props.children }
    </Content>
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
  children: React.PropTypes.node.isRequired
};

export default App;

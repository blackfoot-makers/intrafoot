import React from 'react';
import { Layout, Content, Grid } from 'react-mdl';

import SubscribeComponent from '../SubscribeComponent';
import AppBar from './items/app-bar';
import AppDrawer from './items/app-drawer';
// import AppFooter from './items/app-footer';

class App extends React.Component {
  constructor(props) {
    super(props);

    props.subscribe('devis');
    props.subscribe('projects');
    props.subscribe('factures');
  }
  render() {
    const { children } = this.props;
    return (
      <Layout fixedHeader>
        <AppBar />
        <AppDrawer />
        <Content component={Grid}>
          { children }
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
  }
}
App.propTypes = {
  children: React.PropTypes.node.isRequired,
  subscribe: React.PropTypes.func.isRequired
};

export default SubscribeComponent(App);

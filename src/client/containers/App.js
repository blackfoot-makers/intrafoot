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
    props.subscribe('prestas');
    props.subscribe('users');
    props.subscribe('companies');
    props.subscribe('history');
  }
  render() {
    const { children, location } = this.props;
    const pathIndex = location.pathname.indexOf('/', 1);
    const pathname = location.pathname.substr(1, pathIndex > 0 ? pathIndex - 1 : undefined);
    let subTitle = '';

    switch (pathname) {
      case 'facture':
        subTitle = 'Facture';
        break;
      case 'user':
        subTitle = 'Profile';
        break;
      case 'contact':
        subTitle = 'Networking';
        break;
      case 'project':
        subTitle = 'Projets';
        break;
      case 'devis':
        subTitle = 'Devis';
        break;
      default:
        subTitle = 'Dashboard';
    }
    return (
      <Layout fixedHeader>
        <AppBar subTitle={subTitle} />
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
  location: React.PropTypes.object.isRequired,
  subscribe: React.PropTypes.func.isRequired
};

export default SubscribeComponent(App);

import React, { PureComponent } from 'react';
import { object, func, shape } from 'prop-types';
import { Route } from 'react-router-dom';
import { Switch } from 'react-router';
import { Layout, Content, Grid } from 'react-mdl';

import SubscribeComponent from '../SubscribeComponent';
import AppBar from './items/app-bar';
import AppDrawer from './items/app-drawer';
// import AppFooter from './items/app-footer';
import DefaultPage from '../views/defaultPage';
import LoginForm from '../account/LoginForm';
import User from '../user/User';
import UserAdd from '../user/items/UserAdd';
import UserShow from '../user/items/UserShow';
import Project from '../project/Project';
import ProjectAdd from '../project/items/ProjectAdd';
import ProjectShow from '../project/items/ProjectShow';
import Devis from '../devis/Devis';
import DevisAdd from '../devis/items/DevisAdd';
import DevisShow from '../devis/items/DevisShow';
import Facture from '../facture/Facture';
import FactureAdd from '../facture/items/FactureAdd';
import FactureShow from '../facture/items/FactureShow';
import Presta from '../presta/Presta';
import PrestaAdd from '../presta/items/PrestaAdd';
import PrestaShow from '../presta/items/PrestaShow';
import History from '../history/History';

class App extends PureComponent {
  constructor(props) {
    super(props);

    props.subscribe('devis');
    props.subscribe('projects');
    props.subscribe('factures');
    props.subscribe('presta');
    props.subscribe('users');
    props.subscribe('companies');
    props.subscribe('history');
  }

  render() {
    const { location, history } = this.props;
    const pathIndex = location.pathname.indexOf('/', 1);
    const pathname = location.pathname.substr(
      1,
      pathIndex > 0 ? pathIndex - 1 : undefined
    );
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
        <AppDrawer history={history} />
        <Content component={Grid}>
          <Switch>
            <Route exact path="/" component={DefaultPage} />
            <Route exact path="/user" component={LoginForm} />
            <Route exact path="/contact" component={User} />
            <Route exact path="/contact/add" component={UserAdd} />
            <Route path="/contact/edit/:contactId" component={UserAdd} />
            <Route path="/contact/:contactId" component={UserShow} />
            <Route exact path="/project" component={Project} />
            <Route exact path="/project/add" component={ProjectAdd} />
            <Route path="/project/edit/:projectId" component={ProjectAdd} />
            <Route path="/project/:projectId" component={ProjectShow} />
            <Route exact path="/devis" component={Devis} />
            <Route exact path="/devis/add" component={DevisAdd} />
            <Route path="/devis/edit/:devisId" component={DevisAdd} />
            <Route path="/devis/:devisId" component={DevisShow} />
            <Route exact path="/facture" component={Facture} />
            <Route exact path="/facture/add" component={FactureAdd} />
            <Route path="/facture/edit/:factureId" component={FactureAdd} />
            <Route path="/facture/:factureId" component={FactureShow} />
            <Route exact path="/presta" component={Presta} />
            <Route exact path="/presta/add" component={PrestaAdd} />
            <Route path="/presta/edit/:prestaId" component={PrestaAdd} />
            <Route path="/presta/:prestaId" component={PrestaShow} />
            <Route exact path="/history" component={History} />
          </Switch>
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
  location: object.isRequired,
  subscribe: func.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

export default SubscribeComponent(App);

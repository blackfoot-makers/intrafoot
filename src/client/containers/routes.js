import { DrawerNavigator, StackNavigator } from 'react-navigation';
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

const UserNavigator = StackNavigator(
  {
    UserHome: {
      screen: User,
      path: ''
    },
    UserAdd: {
      screen: UserAdd,
      path: 'add'
    },
    UserEdit: {
      screen: UserAdd,
      path: 'edit/:contactId'
    },
    UserShow: {
      screen: UserShow,
      path: ':contactId'
    }
  },
  {
    initialRouteName: 'UserHome'
  }
);

const ProjectNavigator = StackNavigator(
  {
    ProjectHome: {
      screen: Project,
      path: ''
    },
    ProjectAdd: {
      screen: ProjectAdd,
      path: 'add'
    },
    ProjectEdit: {
      screen: ProjectAdd,
      path: 'edit/:projectId'
    },
    ProjectShow: {
      screen: ProjectShow,
      path: ':projectId'
    }
  },
  {
    initialRouteName: 'ProjectHome'
  }
);

const DevisNavigator = StackNavigator(
  {
    DevisHome: {
      screen: Devis,
      path: ''
    },
    DevisAdd: {
      screen: DevisAdd,
      path: 'add'
    },
    DevisEdit: {
      screen: DevisAdd,
      path: 'edit/:devisId'
    },
    DevisShow: {
      screen: DevisShow,
      path: ':devisId'
    }
  },
  {
    initialRouteName: 'DevisHome'
  }
);

const FactureNavigator = StackNavigator(
  {
    FactureHome: {
      screen: Facture,
      path: ''
    },
    FactureAdd: {
      screen: FactureAdd,
      path: 'add'
    },
    FactureEdit: {
      screen: FactureAdd,
      path: 'edit/:factureId'
    },
    FactureShow: {
      screen: FactureShow,
      path: ':factureId'
    }
  },
  {
    initialRouteName: 'FactureHome'
  }
);

const PrestaNavigator = StackNavigator(
  {
    PrestaHome: {
      screen: Presta,
      path: ''
    },
    PrestaAdd: {
      screen: PrestaAdd,
      path: 'add'
    },
    PrestaEdit: {
      screen: PrestaAdd,
      path: 'edit/:prestaId'
    },
    PrestaShow: {
      screen: PrestaShow,
      path: ':prestaId'
    }
  },
  {
    initialRouteName: 'PrestaHome'
  }
);

const AppNavigator = DrawerNavigator(
  {
    DefaultPage: {
      screen: DefaultPage,
      path: ''
    },
    LoginForm: {
      screen: LoginForm,
      path: '/user'
    },
    User: {
      screen: UserNavigator,
      path: 'contact'
    },
    Project: {
      screen: ProjectNavigator,
      path: 'project'
    },
    Devis: {
      screen: DevisNavigator,
      path: 'devis'
    },
    Facture: {
      screen: FactureNavigator,
      path: 'facture'
    },
    Presta: {
      screen: PrestaNavigator,
      path: 'presta'
    },
    History: {
      screen: History,
      path: 'history'
    }
  },
  {
    initialRouteName: 'DefaultPage'
  }
);

export default AppNavigator;

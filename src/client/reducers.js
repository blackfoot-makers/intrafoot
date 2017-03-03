import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import projectReducer from './project/projectReducer';
import accountReducer from './account/accountReducer';
import userReducer from './user/userReducer';
import devisReducer from './devis/devisReducer';
import factureReducer from './facture/factureReducer';
import prestaReducer from './presta/prestaReducer';
import historyReducer from './history/historyReducer';


export default combineReducers({
  routing,
  prestas: prestaReducer,
  devis: devisReducer,
  projects: projectReducer,
  factures: factureReducer,
  form: formReducer,
  currentUser: accountReducer,
  users: userReducer,
  history: historyReducer
});

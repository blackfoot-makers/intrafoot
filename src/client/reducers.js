import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import projectReducer from './project/projectReducer';
import accountReducer from './account/accountReducer';
import devisReducer from './devis/devisReducer';

export default combineReducers({
  routing,
  devis: devisReducer,
  projects: projectReducer,
  form: formReducer,
  user: accountReducer
});

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';

import { visibilityFilter, pageSkip, setTodo } from './todo/todoReducer';
import accountReducer from './account/accountReducer';

export default combineReducers({
  routing,
  visibilityFilter,
  pageSkip,
  todos: setTodo,
  form: formReducer,
  user: accountReducer
});

import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import { visibilityFilter, pageSkip, setTodo } from './todo/todoReducer';

export default combineReducers({
  visibilityFilter,
  pageSkip,
  todos: setTodo,
  form: formReducer,
});

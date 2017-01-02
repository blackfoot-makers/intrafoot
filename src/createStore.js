import { createStore, applyMiddleware } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';

import reducers from './reducers';
import { loadTodo } from './todo/todoActions';

const logger = createLogger();
const middleware = [thunk, logger];

export default () => {
  const store = createStore(reducers, applyMiddleware(...middleware));

  // Register todo to be load every time
  if (!Meteor.isServer) {
    store.dispatch(loadTodo());
  }

  return store;
};

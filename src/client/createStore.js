import { createStore, applyMiddleware, compose } from 'redux';
import createLogger from 'redux-logger';
import thunk from 'redux-thunk';
import { initialize } from 'redux-form';
import { push } from 'react-router-redux';
import { persistStore, autoRehydrate } from 'redux-persist';

import reducers from './reducers';
import { loadTodo } from './todo/todoActions';

export default () => {
  const logger = createLogger();
  const middleware = [thunk, logger];
  const storeEnhancers = [
    // autoRehydrate(),
    applyMiddleware(...middleware),
    window.devToolsExtension && process.env.NODE_ENV !== 'production' ? window.devToolsExtension() : f => f
  ];

  const store = compose(...storeEnhancers)(createStore)(reducers);

  // Register todo to be load every time
  //if (Meteor.isClient) {
    // store.dispatch(loadTodo());
    // persistStore(store, {
    //   blacklist: ['routing', 'form']
    // }, () => {
    //   const state = store.getState();
    //   store.dispatch(initialize('userForm', state.user));

      //if (!isLoggedIn(state)) {
      // store.dispatch(push('/user'));
      //}
    // });
  //}

  return store;
};

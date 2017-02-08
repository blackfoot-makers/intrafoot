import React from 'react';
import classNames from 'classnames';

import AppBar from '../app-bar/app-bar';
import AppDrawer from '../app-drawer/app-drawer';

const App = props => (
  <div className={classNames('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header')}>
    <AppBar />
    <AppDrawer />
    { props.children }
  </div>
);

export default App;

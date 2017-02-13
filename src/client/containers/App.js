import React from 'react';
import classNames from 'classnames';

import AppBar from '../app-bar/app-bar';
import AppDrawer from '../app-drawer/app-drawer';

const App = (props) => {
  return (
    <div className={classNames('mdl-layout', 'mdl-js-layout', 'mdl-layout--fixed-header')}>
      <AppBar />
      <AppDrawer />
      { props.children }
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
    </div>
  );
};

export default App;

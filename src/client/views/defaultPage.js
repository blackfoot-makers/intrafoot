
import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
// import { Popover, RaisedButton } from 'material-ui';
// import { Accounts } from 'meteor/std:accounts-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SubscribeComponent from '../SubscribeComponent';
import LoginForm from '../account/LoginForm';

// import AccountsWrapper from './account/AccountsWrapper';

// const Login = ({ handleTouchTap, open, anchorEl, handleRequestClose }) =>
//   <div>
//     <RaisedButton
//       onTouchTap={handleTouchTap}
//       label="Login"
//     />
//     <Popover
//       label="login"
//       open={open}
//       anchorEl={anchorEl}
//       anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
//       targetOrigin={{ horizontal: 'left', vertical: 'top' }}
//       onRequestClose={handleRequestClose}
//     >
//       <LoginForm />
//     </Popover>
//   </div>;

// Login.propTypes = {
//   open: PropTypes.bool.isRequired,
//   anchorEl: PropTypes.object,
//   handleTouchTap: PropTypes.func.isRequired,
//   handleRequestClose: PropTypes.func.isRequired,
// };

// Login.contextTypes = {
//   muiTheme: PropTypes.object.isRequired,
// };

// Login.muiName = 'RaisedButton';

// App component - represents the whole app
class DefaultPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  componentWillMount() {
  }

  render() {
    return (
      <div>
        <div className="mdl-grid">
          DefaultPage
        </div>
      </div>
    );
  }
}

DefaultPage.propTypes = {
  currentUser: PropTypes.object,
};

DefaultPage.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    currentUser: Meteor.user(),
  };
}

export default connect(mapStateToProps)(SubscribeComponent(DefaultPage));

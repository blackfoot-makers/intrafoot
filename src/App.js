import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Accounts } from 'meteor/std:accounts-ui';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import SubscribeComponent from './SubscribeComponent';
import { addTodo } from './todo/todoActions';
import Todos from './todo/Todos';
// import AccountsWrapper from './account/AccountsWrapper';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hideCompleted: false,
    };
  }

  getChildContext() {
    return {
      muiTheme: getMuiTheme(),
    };
  }

  componentWillMount() {
    this.props.subscribe('getTodos');
  }

  _toggleHideCompleted() {
    this.setState({
      hideCompleted: !this.state.hideCompleted,
    });
  }

  _renderTasks() {
    let filteredTodos = this.props.todos;
    if (this.state.hideCompleted) {
      filteredTodos = filteredTodos.filter(todo => !todo.completed);
    }
    return filteredTodos.map((todo) => {
      const currentUserId = this.props.currentUser && this.props.currentUser._id;
      const showPrivateButton = todo.owner === currentUserId;

      return (<Todos key={todo._id} todo={todo} showPrivateButton={showPrivateButton} />);
    });
  }

  _handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = this.textInput.value.trim();

    this.props.addTodo(text);

    // Clear form
    this.textInput.value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List ({this.props.incompleteCount})</h1>
          <label className="hide-completed" htmlFor="hideCompleted">
            <input
              name="hideCompleted"
              type="checkbox"
              readOnly
              checked={this.state.hideCompleted}
              onClick={() => this._toggleHideCompleted}
            />
            Hide Completed Tasks
          </label>
          <Accounts.ui.LoginForm />

          {
            this.props.currentUser &&
            <form className="new-task" onSubmit={() => this._handleSubmit} >
              <input
                type="text"
                ref={(textInput) => { this.textInput = textInput; }}
                placeholder="Type to add new tasks"
              />
            </form>
          }
        </header>

        <ul>
          { this._renderTasks() }
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  todos: PropTypes.array.isRequired,
  incompleteCount: PropTypes.number.isRequired,
  currentUser: PropTypes.object,
  subscribe: PropTypes.func,
  addTodo: PropTypes.func,
};

App.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

function mapStateToProps(state) {
  return {
    todos: state.todos.todos || [],
    incompleteCount: state.todos.incompleteCount || 0,
    currentUser: Meteor.user(),
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (text) => {
      dispatch(addTodo(text));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(App));

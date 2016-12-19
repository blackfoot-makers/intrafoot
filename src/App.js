import React, { Component, PropTypes } from 'react';
import SubscribeComponent from './SubscribeComponent';
import { connect } from 'react-redux';
import ReactDOM from 'react-dom';

import { addTodo } from './todo/todoActions';
import Todos from './todo/Todos';
import AccountsWrapper from './account/AccountsWrapper';

// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.subscribe('getTodos');
  }

  _renderTasks() {
    return this.props.todos.map((todo) => (
      <Todos key={todo._id} todo={todo} />
    ));
  }

  _handleSubmit(event) {
    event.preventDefault();

    // Find the text field via the React ref
    const text = ReactDOM.findDOMNode(this.refs.textInput).value.trim();

    console.log('HANDLE SUBMIT EVENT VALUE IS ', text);
    this.props.addTodo(text);

    // Clear form
    ReactDOM.findDOMNode(this.refs.textInput).value = '';
  }

  render() {
    return (
      <div className="container">
        <header>
          <h1>Todo List</h1>

          <AccountsWrapper />

          <form className="new-task" onSubmit={this._handleSubmit.bind(this)} >
            <input
              type="text"
              ref="textInput"
              placeholder="Type to add new tasks"
            />
          </form>
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
};

function mapStateToProps(state) {
  console.log('state has stuff in it ', state);
  return {
    todos: state.todos || []
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addTodo: (text) => {
      dispatch(addTodo(text));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(App));

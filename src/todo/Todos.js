import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { toggleTodo, deleteTodo, tooglePrivate } from './todoActions';

// Task component - represents a single todo item
class Todos extends Component {
  constructor(props) {
    super(props)
  }

  toggleChecked() {
    // Set the checked property to the opposite of its current value
    this.props.toggleTodo(this.props.todo._id);
  }

  deleteThisTask() {
    this.props.deleteTodo(this.props.todo._id);
  }

  togglePrivate() {
    this.props.tooglePrivate(this.props.todo._id);
  }

  render() {
    const taskClassName = classnames({
      checked: this.props.todo.completed,
      private: this.props.todo.private,
    });

    return (
      <li className={taskClassName}>
       <button className="delete" onClick={this.deleteThisTask.bind(this)}>
         &times;
       </button>

       <input
         type="checkbox"
         readOnly
         checked={this.props.todo.completed}
         onClick={this.toggleChecked.bind(this)}
       />

       {
         this.props.showPrivateButton &&
         <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
           { this.props.todo.private ? 'Private' : 'Public' }
         </button>
       }
      <span className="text">
        <strong>{this.props.todo.username}</strong>: {this.props.todo.text}
      </span>
     </li>
    );
  }
}

Todos.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  todo: PropTypes.object.isRequired,
  showPrivateButton: PropTypes.bool.isRequired
};

function mapDispatchToProps(dispatch) {
  return {
    toggleTodo: (id) => {
      dispatch(toggleTodo(id));
    },
    deleteTodo: (id) => {
      dispatch(deleteTodo(id));
    },
    tooglePrivate: (id) => {
      dispatch(tooglePrivate(id));
    }
  }
}

export default connect(null, mapDispatchToProps)(Todos);

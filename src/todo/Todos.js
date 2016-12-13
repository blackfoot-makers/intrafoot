import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { toggleTodo } from './todoActions';

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
    // Tasks.remove(this.props.todo._id);
  }

  render() {
    const taskClassName = this.props.todo.completed ? 'checked' : '';

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

       <span className="text">{this.props.todo.text}</span>
     </li>
    );
  }
}

Todos.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  todo: PropTypes.object.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    toggleTodo: (id) => {
      dispatch(toggleTodo(id));
    }
  }
}

export default connect(null, mapDispatchToProps)(Todos);

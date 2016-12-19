import { Tracker } from 'meteor/tracker';
import Todos from './todoSchema';

export function addTodo(text) {
  return () => {
    Meteor.call('addTodo', text);
  };
};

export function deleteTodo(id) {
  return () => {
    Meteor.call('deleteTodo', id);
  };
};

export function toggleTodo(id) {
  return () => {
    Meteor.call('toggleTodo', id);
  };
};

export function tooglePrivate(id) {
  return () => {
    Meteor.call('tooglePrivate', id);
  };
};

export function loadTodo() {
  return (dispatch) => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_TODO',
        todos: Todos.find({}, { sort: { createdAt: -1 } }).fetch() || [],
        incompleteCount: Todos.find({completed: {$ne: true}}).count()
      });
    });
  }
}

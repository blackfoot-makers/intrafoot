import { Tracker } from 'meteor/tracker';
import Todos from './todoSchema';

export function addTodo(text) {
  return () => {
    Meteor.call('addTodo', text);
  };
};

export function toggleTodo(id) {
  return () => {
    Meteor.call('toggleTodo', id);
  };
};

export function loadTodo() {
  return (dispatch) => {
    Tracker.autorun(() => {
      console.log('logging todos', Todos.find().fetch() || []);
      dispatch({
        type: 'SET_TODO',
        todos: Todos.find().fetch() || [],
      });
    });
  }
}

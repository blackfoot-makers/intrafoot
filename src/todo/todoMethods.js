import { check } from 'meteor/check';
import Todos from './todoSchema';

Meteor.methods({
  addTodo(text) {
    if (!this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    check(text, String);

    const newTodos = {
      text,
      completed: false,
      createdAt: new Date(),
      owner: this.userId,
      username: Meteor.users.findOne(this.userId).username
      || Meteor.users.findOne(this.userId).profile.name
    };

    const todos = Todos.insert(newTodos);

    return todos;
  },
  deleteTodo(id) {
    check(id, String);
    const todo = Todos.find({ _id: id });

    if (todo.private && todo.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    Todos.remove(id);
  },
  toggleTodo(id) {
    check(id, String);

    const todoInQuestion = Todos.findOne({ _id: id });
    const completed = todoInQuestion.completed;

    if (todoInQuestion.private && todoInQuestion.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }
    return Todos.update( {_id: id }, { $set: { completed: !completed }});
  },
  tooglePrivate(id) {
    check(id, String);

    const todoInQuestion = Todos.findOne({ _id: id });

    // Make sure only the task owner can make a task private
    if (todoInQuestion.owner !== this.userId) {
      throw new Meteor.Error('not-authorized');
    }

    return Todos.update({ _id: id }, { $set: { private: !todoInQuestion.private } })
  }
});

import Todos from './todoSchema';

Meteor.methods({
  addTodo(text) {
    const todos = Todos.insert({
      text,
      completed: false,
      createdAt: new Date()
    });
    console.log('add todo !!!!! ', todos);

    return todos;
  },
  toggleTodo(id) {
    const todoInQuestion = Todos.findOne({_id: id}, {fields: {completed: true}});
    const completed = todoInQuestion.completed;
    return Todos.update({_id: id}, {$set: {completed: !completed}});
  }
});

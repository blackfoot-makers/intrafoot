import Todos from './todoSchema';

const todoPubFields = {
  text: 1,
  completed: 1
};

const getTodoPublication = function (filter, pageSkip = 0) {
  let query = {};

  switch (filter) {
    case 'SHOW_COMPLETED':
      query.completed = true;
      break;
    case 'SHOW_ACTIVE':
      query.completed = false;
      break;
    default:
      break;
  }
  console.log('run todos find with ', filter);
  return Todos.find(query, {fields: todoPubFields, skip: pageSkip});
};

if (Meteor.isServer) {
console.log('publishing getTodos');
Meteor.publish('getTodos', getTodoPublication);
}

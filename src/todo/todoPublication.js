import Todos from './todoSchema';

const todoPubFields = {
  text: 1,
  completed: 1,
  createdAt: 1,
  owner: 1,
  username: 1,
  private: 1
};

const getTodoPublication = function (filter, pageSkip = 0) {
  return Todos.find({
    $or: [
      {private: {$ne: true}},
      {owner: this.userId}
    ]
  }, {fields: todoPubFields, skip: pageSkip});
};

if (Meteor.isServer) {
  Meteor.publish('getTodos', getTodoPublication);
}

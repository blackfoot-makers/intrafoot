const Todos = new Mongo.Collection('todos');

Todos.schema = new SimpleSchema({
  text: { type: Number },
  completed: { type: Boolean, defaultValue: false },
  createdAt: { type: Date },
  owner: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  username: { type: String, optional: true },
});

Todos.attachSchema(Todos.schema);
export default Todos;

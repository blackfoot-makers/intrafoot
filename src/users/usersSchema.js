const Users = new Mongo.Collection('user');

Users.schema = new SimpleSchema({
  id: { type: String, regEx: SimpleSchema.RegEx.Id },
  firstName: { type: String },
  lastName: { type: String },
  phone: { type: String, regEx: /^(0|\+[1-9]{2})[1-9]([-. ]?[0-9]{2}){4}$/, optional: true },
  linkedin: { type: String, regEx: SimpleSchema.RegEx.Url, optional: true },
  sites: { type: [String], regEx: SimpleSchema.RegEx.Url, optional: true },
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  interlocuteur: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  description: { type: String, optional: true },
  accessLevel: { type: Number, min: 0, max: 5, optional: true },
  lastContact: { type: Date, optional: true },
  history: { type: [String], regEx: SimpleSchema.RegEx.Id },
  title: { type: String },
  company: { type: String },
});

Users.attachSchema(Users.schema);
export default Users;

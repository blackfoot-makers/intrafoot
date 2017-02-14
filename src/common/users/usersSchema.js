import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';

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
  history: { type: [String], regEx: SimpleSchema.RegEx.Id, optional: true },
  title: { type: String },
  company: { type: String },
});

Users.attachSchema(Users.schema);

if (Meteor.isServer) {
  Accounts.onCreateUser((options, user) => {
    user.profile = options.profile || {};

    if (user.profile &&
      user.profile.email.includes('@blackfoot.io', user.profile.email.indexOf('@'))) {
      Roles.setRolesOnUserObj(user, 'admin', Roles.GLOBAL_GROUP);
      console.log('ADDING ROLE TO USER');
    }

    Users.insert({
      ...user.profile,
      id: user._id
    });
    return user;
  });
}

export default Users;

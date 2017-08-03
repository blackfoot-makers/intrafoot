import { Accounts } from 'meteor/accounts-base';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { Roles } from 'meteor/alanning:roles';
import Companies from './companySchema.js';

Accounts.config({
  sendVerificationEmail: true,
  forbidClientAccountCreation: false
});
Accounts.emailTemplates = {
  ...Accounts.emailTemplates,
  from: 'Blackfoot clan <intra@blackfoot.io>',
  siteName: 'intra.blackfoot.io',
  verifyEmail: {
    subject() {
      return 'Active ton compte';
    },
    text(user, url) {
      return `Salut ${user.profile
        .firstName}!\nTu peux activer ton compte en cliquant sur ce lien: ${url}`;
    }
  }
};

const Users = new Mongo.Collection('user');

Users.schema = new SimpleSchema({
  id: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  firstName: { type: String },
  lastName: { type: String },
  phone: {
    type: String,
    regEx: /^(0|\+[1-9]{2})[1-9]([-. ]?[0-9]{2}){4}$/,
    optional: true
  },
  linkedin: { type: String, regEx: SimpleSchema.RegEx.Url, optional: true },
  sites: { type: [String], regEx: SimpleSchema.RegEx.Url, optional: true },
  email: { type: String, regEx: SimpleSchema.RegEx.Email },
  interlocuteur: { type: String, regEx: SimpleSchema.RegEx.Id, optional: true },
  description: { type: String, optional: true },
  accessLevel: { type: Number, min: 0, max: 5, optional: true },
  lastContact: { type: Date, optional: true },
  history: { type: [String], regEx: SimpleSchema.RegEx.Id, optional: true },
  projects: { type: [String], regEx: SimpleSchema.RegEx.Id, optional: true },
  title: { type: String },
  company: { type: String }
});

Users.attachSchema(Users.schema);

if (Meteor.isServer) {
  Accounts.onCreateUser((options, userParam) => {
    const user = userParam;
    user.profile = options.profile || {};

    if (
      user.profile &&
      user.profile.email.includes(
        '@blackfoot.io',
        user.profile.email.indexOf('@')
      )
    ) {
      Roles.setRolesOnUserObj(user, 'admin', Roles.GLOBAL_GROUP);
    }

    Users.insert({
      ...user.profile,
      createdAt: new Date(),
      id: user._id
    });

    if (!Companies.findOne({ name: user.profile.company })) {
      Companies.insert({
        name: user.profile.company
      });
    }

    return user;
  });
}

export default Users;

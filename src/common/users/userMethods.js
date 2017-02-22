import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Users from './usersSchema';
import Companies from './companySchema';

const checkAllParams =
({
  id = '',
  firstName,
  lastName,
  phone = '',
  linkedin = '',
  sites = '',
  email,
  interlocuteur = '',
  description = '',
  accessLevel = 0,
  lastContact = null,
  history = [],
  title,
  company
 }) => {
  check(id, String);
  check(firstName, String);
  check(description, String);
  check(company, String);
  check(lastName, String);
  check(phone, String);
  check(linkedin, String);
  check(sites, String);
  check(email, String);
  check(interlocuteur, String);
  check(accessLevel, Number);
  check(lastContact, Date);
  check(history, Array);
  check(title, String);
};

Meteor.methods({

  addUser(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);
    const sites = params.sites.split(';');
    const newUsers = {
      ...params,
      sites,
      createdAt: new Date(),
      creator: this.userId
    };

    const users = Users.insert(newUsers);

    if (!Companies.findOne({ name: newUsers.company })) {
      Companies.insert({
        name: newUsers.company
      });
    }
    return users;
  },

  deleteUser(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    Users.remove(id);
  },

  editUser(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const {
      _id,
      id,
      firstName,
      lastName,
      phone,
      linkedin,
      sites,
      email,
      interlocuteur,
      description,
      accessLevel,
      lastContact,
      history,
      title,
      company
    } = params;

    if (!Companies.findOne({ name: company })) {
      Companies.insert({
        name: company
      });
    }

    return Users.update({ _id }, { $set: {
      id,
      firstName,
      lastName,
      phone,
      linkedin,
      sites,
      email,
      interlocuteur,
      description,
      accessLevel,
      lastContact,
      history,
      title,
      company
    } });
  }
});

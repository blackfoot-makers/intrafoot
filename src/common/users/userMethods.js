import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Users from './usersSchema';
import Companies from './companySchema';
import History from '../history/historySchema';

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

  return {
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
  };
};

Meteor.methods({

  addUser(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    let newUsers = checkAllParams(params);
    const sites = newUsers.sites.split(';');
    newUsers = {
      ...newUsers,
      sites,
      createdAt: new Date(),
      creator: this.userId
    };

    const users = Users.insert(newUsers);

    if (!Companies.findOne({ name: newUsers.company })) {
      Companies.insert({
        name: newUsers.company
      });

      History.insert({
        user: this.userId,
        doc: 'company',
        action: 'create',
        date: new Date()
      });
    }

    if (users) {
      History.insert({
        user: this.userId,
        doc: 'contact',
        action: 'create',
        date: new Date()
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
    History.insert({
      user: this.userId,
      doc: 'contact',
      action: 'delete',
      date: new Date()
    });
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
      History.insert({
        user: this.userId,
        doc: 'company',
        action: 'create',
        date: new Date()
      });
    }

    const user = Users.update({ _id }, { $set: {
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

    History.insert({
      user: this.userId,
      doc: 'contact',
      action: 'edit',
      date: new Date()
    });

    return user;
  }
});

import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Projects from './projectSchema';

const checkAllParams =
({ id, name, description, company, signature, status, remarque = '', participants = [], nda }) => {
  check(id, String);
  check(name, String);
  check(description, String);
  check(company, String);
  check(signature, Date);
  check(status, String);
  check(remarque, String);
  check(participants, Array);
  check(nda, Boolean);
};

Meteor.methods({

  addProject(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const newProjects = {
      ...params,
      createdAt: new Date(),
      creator: this.userId
    };

    const projects = Projects.insert(newProjects);

    return projects;
  },

  deleteProject(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    Projects.remove(id);
  },

  editProject(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const {
      _id,
      id,
      name,
      description,
      company,
      signature,
      status,
      remarque,
      participants,
      nda
    } = params;

    return Projects.update({ _id }, { $set: {
      id,
      name,
      description,
      company,
      signature,
      status,
      remarque,
      participants,
      nda
    } });
  }
});

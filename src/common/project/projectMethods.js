import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Projects from './projectSchema';
import Companies from '../users/companySchema';
import History from '../history/historySchema';

const checkAllParams =
({ id, name, description, signature = null, company, status, remarque = '', participants = [], nda }) => {
  check(id, String);
  check(name, String);
  check(description, String);
  check(company, String);
  check(status, String);
  check(remarque, String);
  check(participants, Array);
  check(nda, Boolean);
  if (signature) {
    check(signature, Date);
  }
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
      devis: [],
      factures: [],
      creator: this.userId
    };

    const projects = Projects.insert(newProjects);

    if (!Companies.findOne({ name: newProjects.company })) {
      Companies.insert({
        name: newProjects.company
      });
      History.insert({
        user: this.userId,
        doc: 'company',
        action: 'create',
        date: new Date()
      });
    }

    if (projects) {
      History.insert({
        user: this.userId,
        doc: 'project',
        action: 'create',
        date: new Date()
      });
    }
    return projects;
  },

  deleteProject(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    Projects.remove(id);

    History.insert({
      user: this.userId,
      doc: 'project',
      action: 'delete',
      date: new Date()
    });
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

    const project = Projects.update({ _id }, { $set: {
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

    if (project) {
      History.insert({
        user: this.userId,
        doc: 'project',
        action: 'edit',
        date: new Date()
      });
    }
    return project;
  }
});

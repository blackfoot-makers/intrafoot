import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Devis from './devisSchema';
import Projects from '../project/projectSchema';
import History from '../history/historySchema';

const checkAllParams = ({
  id,
  idProject,
  price,
  signature = null,
  status,
  remarque = '',
  signed
}) => {
  check(id, String);
  check(idProject, String);
  check(price, Number);
  if (signature) {
    check(signature, Date);
  }
  check(status, String);
  check(remarque, String);
  check(signed, Boolean);
};

Meteor.methods({
  addDevis(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const newDevis = {
      ...params,
      createdAt: new Date(),
      creator: this.userId
    };

    const devis = Devis.insert(newDevis);
    if (devis) {
      History.insert({
        user: this.userId,
        doc: 'devis',
        action: 'create',
        date: new Date()
      });
    }

    const project = Projects.findOne(params.idProject);
    if (project) {
      Projects.update(
        { _id: project._id },
        {
          $addToSet: { devis },
          $set: { signature: newDevis.signature }
        }
      );
    }

    return devis;
  },

  deleteDevis(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    const devis = Devis.findOne(id);
    if (!devis) {
      throw new Meteor.Error('No devis found to delete');
    }
    const project = Projects.findOne(devis.idProject);
    if (project) {
      Projects.update({ _id: project._id }, { $pull: { devis: id } });
    }

    Devis.remove(id);
    History.insert({
      user: this.userId,
      doc: 'devis',
      action: 'delete',
      date: new Date()
    });
  },

  editDevis(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const {
      _id,
      id,
      idProject,
      price,
      signature,
      status,
      remarque,
      signed
    } = params;

    const project = Projects.findOne(idProject);
    if (project && signature) {
      Projects.update({ _id: project._id }, { $set: { signature } });
    }

    const devis = Devis.update(
      { _id },
      {
        $set: {
          id,
          idProject,
          price,
          signature,
          status,
          remarque,
          signed
        }
      }
    );

    History.insert({
      user: this.userId,
      doc: 'devis',
      action: 'edit',
      date: new Date()
    });

    return devis;
  }
});

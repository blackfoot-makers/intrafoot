import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Devis from './devisSchema';

const checkAllParams =
({
  id,
  idProject,
  price,
  signature = null,
  status,
  remarque = '',
  signed }) => {
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

    const deviss = Devis.insert(newDevis);

    return deviss;
  },

  deleteDevis(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    Devis.remove(id);
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

    return Devis.update({ _id }, { $set: {
      id,
      idProject,
      price,
      signature,
      status,
      remarque,
      signed
    } });
  }
});

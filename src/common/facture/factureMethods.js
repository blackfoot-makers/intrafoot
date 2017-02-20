import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Factures from './factureSchema';

const checkAllParams =
({
  id,
  idProject,
  idDevis,
  price,
  sentDate,
  payed,
  pricePayed,
  delayTillPayed,
  remarque = '',
  payedDate }) => {
  check(id, String);
  check(idProject, String);
  check(price, Number);
  if (idDevis) {
    check(idDevis, String);
  }
  if (sentDate) {
    check(sentDate, Date);
  }
  if (pricePayed) {
    check(pricePayed, Number);
  }
  if (payedDate) {
    check(payedDate, Date);
  }
  check(payed, String);
  check(remarque, String);
  check(delayTillPayed, Number);
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

    const deviss = Factures.insert(newDevis);

    return deviss;
  },

  deleteDevis(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    Factures.remove(id);
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
      idDevis,
      price,
      sentDate,
      payed,
      pricePayed,
      delayTillPayed,
      remarque = '',
      payedDate
    } = params;

    return Factures.update({ _id }, { $set: {
      id,
      idProject,
      idDevis,
      price,
      sentDate,
      payed,
      pricePayed,
      delayTillPayed,
      remarque,
      payedDate
    } });
  }
});

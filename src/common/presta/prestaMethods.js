import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Prestas from './prestaSchema';
import History from '../history/historySchema';

const checkAllParams =
({
  idContact,
  company,
  prestation,
  price,
  facturation,
  accompte,
  payedDate,
  remarque = '',
  payed }) => {
  check(idContact, String);
  check(company, String);
  check(price, Number);
  check(prestation, String);
  if (facturation) {
    check(facturation, Date);
  }
  if (payedDate) {
    check(payedDate, Date);
  }
  check(accompte, Number);
  check(status, String);
  check(remarque, String);
  check(payed, Boolean);
};

Meteor.methods({

  addPrestas(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const newPrestas = {
      ...params,
      createdAt: new Date(),
      creator: this.userId
    };

    const prestas = Prestas.insert(newPrestas);
    if (prestas) {
      History.insert({
        user: this.userId,
        doc: 'prestas',
        action: 'create',
        date: new Date()
      });
    }

    return prestas;
  },

  deletePrestas(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    Prestas.remove(id);

    History.insert({
      user: this.userId,
      doc: 'prestas',
      action: 'delete',
      date: new Date()
    });
  },

  editPrestas(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const {
      _id,
      idContact,
      company,
      prestation,
      price,
      facturation,
      accompte,
      payedDate,
      remarque,
      payed
    } = params;

    const prestas = Prestas.update({ _id }, { $set: {
      idContact,
      company,
      prestation,
      price,
      facturation,
      accompte,
      payedDate,
      remarque,
      payed
    } });

    History.insert({
      user: this.userId,
      doc: 'prestas',
      action: 'edit',
      date: new Date()
    });

    return prestas;
  }
});

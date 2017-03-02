import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Factures from './factureSchema';
import Projects from '../project/projectSchema';
import History from '../history/historySchema';

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

  addFacture(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const newFacture = {
      ...params,
      createdAt: new Date(),
      creator: this.userId
    };

    const factures = Factures.insert(newFacture);
    const project = Projects.findOne(params.idProject);
    if (project) {
      Projects.update({ _id: project._id }, { $addToSet: { factures } });
    }

    if (factures) {
      History.insert({
        user: this.userId,
        doc: 'facture',
        action: 'create',
        date: new Date()
      });
    }
    return factures;
  },

  deleteFacture(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    const factures = Factures.findOne(id);
    if (!factures) {
      throw new Meteor.Error('No factures found to delete');
    }
    const project = Projects.findOne(factures.idProject);
    if (project) {
      Projects.update({ _id: project._id }, { $pull: { devis: id } });
    }

    Factures.remove(id);

    History.insert({
      user: this.userId,
      doc: 'facture',
      action: 'delete',
      date: new Date()
    });
  },

  editFacture(params) {
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

    const facture = Factures.update({ _id }, { $set: {
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

    if (facture) {
      History.insert({
        user: this.userId,
        doc: 'facture',
        action: 'edit',
        date: new Date()
      });
    }
    return facture;
  }
});

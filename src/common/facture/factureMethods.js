import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Factures from './factureSchema';
import Projects from '../project/projectSchema';
import History from '../history/historySchema';
import Virtucomptes from '../virtucompte/virtucompteSchema';

const checkAllParams = ({
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
}) => {
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

const addMoneyToVirtuCompte = (facture, id, userId) => {
  const accountTypes = ['salaire', 'materiel', 'cnoire', 'mixtes', 'benef'];
  let amount = facture.pricePayed;
  if (facture.payed === 'true') {
    const data = {
      idFacture: id,
      amount,
      date: new Date(),
      type: 'in',
      account: 'in',
      creator: userId
    };
    Virtucomptes.insert(data);
    const tvaAmount = amount - amount / 1.2;
    Virtucomptes.insert({
      ...data,
      amount: tvaAmount,
      account: 'tva'
    });
    amount -= tvaAmount;
    let benef = amount;
    for (let i = 0; i < accountTypes.length; ++i) {
      const account = accountTypes[i];
      let coef = 0.1;
      if (i === 0) {
        coef = 1 - 0.1 * (accountTypes.length - 1);
      }
      const tmpAmount = i === accountTypes.length - 1 ? benef : amount * coef;
      Virtucomptes.insert({
        ...data,
        amount: tmpAmount,
        account
      });
      benef -= tmpAmount;
    }
  }
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
      addMoneyToVirtuCompte(params, factures, this.userId);
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

    const facture = Factures.update(
      { _id },
      {
        $set: {
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
        }
      }
    );

    if (facture) {
      History.insert({
        user: this.userId,
        doc: 'facture',
        action: 'edit',
        date: new Date()
      });
      addMoneyToVirtuCompte(params, _id, this.userId);
    }
    return facture;
  }
});

import { check } from 'meteor/check';
import { Roles } from 'meteor/alanning:roles';

import Virtucomptes from './virtucompteSchema';
// import Facture from '../facture/factureSchema';
import History from '../history/historySchema';

const checkAllParams = ({
  id,
  idFacture,
  amount,
  date,
  type,
  remarque = '',
  account
}) => {
  check(id, String);
  check(amount, Number);
  if (idFacture) {
    check(idFacture, String);
  }
  check(date, Date);
  check(type, String);
  check(remarque, String);
  check(account, String);
};

Meteor.methods({
  addVirtucompte(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const newVirtucompte = {
      ...params,
      createdAt: new Date(),
      creator: this.userId
    };

    const virtucomptes = Virtucomptes.insert(newVirtucompte);
    // const facture = Projects.findOne(params.idProject);
    // if (project) {
    //   Projects.update({ _id: project._id }, { $addToSet: { Virtucomptes } });
    // }

    if (virtucomptes) {
      History.insert({
        user: this.userId,
        doc: 'virtucompte',
        action: 'create',
        date: new Date()
      });
    }
    return virtucomptes;
  },

  deleteVirtucompte(id) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(id, String);

    const virtucomptes = Virtucomptes.findOne(id);
    if (!virtucomptes) {
      throw new Meteor.Error('No virtucomptes found to delete');
    }
    // const project = Projects.findOne(Virtucomptes.idProject);
    // if (project) {
    //   Projects.update({ _id: project._id }, { $pull: { devis: id } });
    // }

    Virtucomptes.remove(id);

    History.insert({
      user: this.userId,
      doc: 'virtucompte',
      action: 'delete',
      date: new Date()
    });
  },

  editVirtucompte(params) {
    if (!this.userId || !Roles.userIsInRole(this.userId, 'admin')) {
      throw new Meteor.Error('not-authorized');
    }

    check(params, Object);
    checkAllParams(params);

    const {
      _id,
      id,
      idFacture,
      amount,
      date,
      type,
      remarque = '',
      account
    } = params;

    const virtucompte = Virtucomptes.update(
      { _id },
      {
        $set: {
          id,
          idFacture,
          amount,
          date,
          type,
          remarque,
          account
        }
      }
    );

    if (virtucompte) {
      History.insert({
        user: this.userId,
        doc: 'virtucompte',
        action: 'edit',
        date: new Date()
      });
    }
    return virtucompte;
  }
});

import { Tracker } from 'meteor/tracker';
import Factures from '../../common/facture/factureSchema';

export function addFacture(data, callback) {
  return () => {
    Meteor.call('addFacture', data, callback);
  };
}

export function deleteFacture(id) {
  return () => {
    Meteor.call('deleteFacture', id);
  };
}

export function editFacture(data, callback) {
  return () => {
    Meteor.call('editFacture', data, callback);
  };
}

export function loadFacture() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_FACTURE',
        factures: Factures.find({}, { sort: { createdAt: -1 } }).fetch() || []
      });
    });
  };
}

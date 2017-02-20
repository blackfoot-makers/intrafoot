import { Tracker } from 'meteor/tracker';
import Factures from '../../common/facture/factureSchema';

export function addFacture(data) {
  return () => {
    Meteor.call('addFacture', data);
  };
}

export function deleteFacture(id) {
  return () => {
    Meteor.call('deleteFacture', id);
  };
}

export function editFacture(data) {
  return () => {
    Meteor.call('editFacture', data);
  };
}

export function loadFacture() {
  return (dispatch) => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_FACTURE',
        factures: Factures.find({}, { sort: { createdAt: -1 } }).fetch() || [],
      });
    });
  };
}

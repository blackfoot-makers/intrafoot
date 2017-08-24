import { Tracker } from 'meteor/tracker';
import Virtucomptes from '../../common/virtucompte/virtucompteSchema';

export function addVirtucompte(data, callback) {
  return () => {
    Meteor.call('addVirtucompte', data, callback);
  };
}

export function deleteVirtucompte(id) {
  return () => {
    Meteor.call('deleteVirtucompte', id);
  };
}

export function editVirtucompte(data, callback) {
  return () => {
    Meteor.call('editVirtucompte', data, callback);
  };
}

export function loadVirtucompte() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_VIRTUCOMPTE',
        virtucomptes:
          Virtucomptes.find({}, { sort: { createdAt: -1 } }).fetch() || []
      });
    });
  };
}

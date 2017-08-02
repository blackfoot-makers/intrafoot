import { Tracker } from 'meteor/tracker';
import Prestas from '../../common/presta/prestaSchema';

export function addPresta(data, callback) {
  return () => {
    Meteor.call('addPresta', data, callback);
  };
}

export function deletePresta(id) {
  return () => {
    Meteor.call('deletePresta', id);
  };
}

export function editPresta(data, callback) {
  return () => {
    Meteor.call('editPresta', data, callback);
  };
}

export function loadPresta() {
  return dispatch => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_PRESTA',
        prestas: Prestas.find({}, { sort: { createdAt: -1 } }).fetch() || []
      });
    });
  };
}

import { Tracker } from 'meteor/tracker';
import History from '../../common/history/historySchema';

export function addHistory(data) {
  return () => {
    Meteor.call('addHistory', data);
  };
}

export function loadHistory() {
  return (dispatch) => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_HISTORY',
        history: History.find({}, { sort: { createdAt: -1 } }).fetch() || [],
      });
    });
  };
}

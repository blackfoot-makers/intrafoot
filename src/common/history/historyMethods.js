import { check } from 'meteor/check';

import History from './historySchema';

Meteor.methods({
  addHistory(params) {
    check(params, Object);
    const { user, doc, action, date } = params;

    check(user, String);
    check(doc, String);
    check(action, String);
    check(date, Date);

    const history = History.insert(params);

    return history;
  }
});

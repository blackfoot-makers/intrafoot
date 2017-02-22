import { Tracker } from 'meteor/tracker';
import { Roles } from 'meteor/alanning:roles';
import Users from '../../common/users/usersSchema';

export function addUser(data) {
  return () => {
    Meteor.call('addUser', data);
  };
}

export function deleteUser(id) {
  return () => {
    Meteor.call('deleteUser', id);
  };
}

export function editUser(data) {
  return () => {
    Meteor.call('editUser', data);
  };
}

export function loadUser() {
  return (dispatch) => {
    Tracker.autorun(() => {
      const users = Users.find({}, { sort: { createdAt: -1 } }).fetch() || [];
      const blackfootUsers = users.reduce((result, user) => {
        const meteroUser = Meteor.users.findOne(user.id);
        if (meteroUser && Roles.userIsInRole(meteroUser._id, 'admin')) {
          result.push(user);
        }
        return result;
      }, []);

      dispatch({
        type: 'SET_USERS',
        users,
        blackfootUsers
      });
    });
  };
}

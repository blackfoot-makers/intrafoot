import { Tracker } from 'meteor/tracker';
import Projects from '../../common/project/projectSchema';

export function addProject(data) {
  return () => {
    Meteor.call('addProject', data);
  };
}

export function deleteProject(id) {
  return () => {
    Meteor.call('deleteProject', id);
  };
}

export function editProject(data) {
  return () => {
    Meteor.call('editProject', data);
  };
}

export function loadProject() {
  return (dispatch) => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_PROJECT',
        projects: Projects.find({}, { sort: { createdAt: -1 } }).fetch() || [],
      });
    });
  };
}

import { Tracker } from 'meteor/tracker';
import { browserHistory } from 'react-router';
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

export function findProject(search) {
  const project = Projects.findOne({ id: search });

  return (dispatch) => {
    dispatch({
      type: 'FIND_PROJECT'
    });
    const id = project && project._id;

    browserHistory.push(`/project/${id}`);
  };
}

export function loadProject() {
  return (dispatch) => {
    Tracker.autorun(() => {
      dispatch({
        type: 'SET_PROJECT',
        projects: Projects.find({}, { sort: { createdAt: -1 } }).fetch() || []
      });
    });
  };
}

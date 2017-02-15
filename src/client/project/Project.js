import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl';

import SubscribeComponent from '../SubscribeComponent';
import ProjectList from './items/ProjectList';

import { addProject, deleteProject, editProject } from './projectActions';

// Projects component - represents the projects lists
class Projects extends Component {

  constructor(props) {
    super(props);
    this.deleteAProject = this.deleteAProject.bind(this);
    this.editAProject = this.editAProject.bind(this);
    this.addAProject = this.addAProject.bind(this);
    this.props.subscribe('projects');
  }

  editAProject(data) {
    this.props.editProject(data);
  }

  addAProject(data) {
    this.props.addProject(data);
  }

  deleteAProject(id) {
    this.props.deleteProject(id);
  }

  render() {
    const projects = this.props.projects.map(data => ({
      action: { itemId: data._id },
      ...data
    }));

    return (
      <Grid>
        <ProjectList projects={projects} />
      </Grid>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  editProject: PropTypes.func.isRequired,
  deleteProject: PropTypes.func.isRequired,
  addProject: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    editProject: (data) => {
      dispatch(editProject(data));
    },
    deleteProject: (id) => {
      dispatch(deleteProject(id));
    },
    addProject: (data) => {
      dispatch(addProject(data));
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(Projects));

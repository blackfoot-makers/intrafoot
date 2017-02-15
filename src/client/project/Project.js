import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Grid, IconButton } from 'react-mdl';

import SubscribeComponent from '../SubscribeComponent';
import ProjectList from './items/ProjectList';
import ProjectAdd from './items/ProjectAdd';

import { deleteProject } from './projectActions';

// Projects component - represents the projects lists
class Projects extends Component {

  constructor(props) {
    super(props);
    this.deleteAProject = this.deleteAProject.bind(this);
    this.renderAction = this.renderAction.bind(this);
    this.props.subscribe('projects');

    this.state = {
      editMode: false
    };
  }

  deleteAProject(id) {
    this.props.deleteProject(id);
  }

  renderAction(data) {
    return (
      <div>
        <IconButton name="edit" icon="edit" onClick={() => this.setState({ editMode: data })} />
        <IconButton
          name="delete"
          icon="delete"
          onClick={() => {
            console.log('DELETE', data._id);
            this.props.deleteProject(data._id);
          }}
        />
      </div>
    );
  }

  render() {
    const projects = this.props.projects.map(data => ({
      action: data,
      ...data
    }));

    if (this.state.editMode) {
      return (
        <Grid>
          <ProjectAdd {...this.state.editMode} editMode />
        </Grid>
      );
    }

    return (
      <Grid>
        <ProjectList projects={projects} renderAction={this.renderAction} />
      </Grid>
    );
  }
}

Projects.propTypes = {
  projects: PropTypes.array.isRequired,
  deleteProject: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProject: (id) => {
      dispatch(deleteProject(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SubscribeComponent(Projects));

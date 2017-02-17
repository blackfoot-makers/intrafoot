import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
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
      editMode: false,
      width: 0
    };
    this.updateWindowDimensions = this.updateWindowDimensions.bind(this);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions.bind(this));
  }

  updateWindowDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  deleteAProject(id) {
    this.props.deleteProject(id);
  }

  renderAction(data) {
    return (
      <div>
        <IconButton name="edit" icon="edit" onClick={() => browserHistory.push(`/project/edit/${data._id}`)} />
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
      <Grid style={{ width: this.state.width - (16 + 16) }}>
        <ProjectList projects={projects} renderAction={this.renderAction} width={this.state.width} />
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

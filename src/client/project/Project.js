import React, { PureComponent } from 'react';
import { array, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Grid, IconButton } from 'react-mdl';
import { bind } from 'decko';

import { requireAuth } from '../utils';
import ProjectList from './items/ProjectList';
import ProjectAdd from './items/ProjectAdd';

import { deleteProject } from './projectActions';

// Projects component - represents the projects lists
class Projects extends PureComponent {
  state = {
    width: 0
  };

  componentWillMount() {
    requireAuth(this.props, this.props.history.replace);
  }

  componentDidMount() {
    this.updateWindowDimensions();
    window.addEventListener('resize', this.updateWindowDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateWindowDimensions);
  }

  @bind
  updateWindowDimensions() {
    this.setState(state => ({
      ...state,
      width: window.innerWidth,
      height: window.innerHeight
    }));
  }

  @bind
  deleteAProject(id) {
    this.props.deleteProject(id);
  }

  @bind
  renderAction(data) {
    return (
      <div>
        <IconButton
          name="fullscreen"
          onClick={() => this.props.history.push(`/project/${data._id}`)}
        />
        <IconButton
          name="edit"
          onClick={() => this.props.history.push(`/project/edit/${data._id}`)}
        />
        <IconButton
          name="delete"
          onClick={() => {
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
          <ProjectAdd />
        </Grid>
      );
    }

    return (
      <Grid style={{ width: this.state.width - (16 + 16) }}>
        <ProjectList
          projects={projects}
          renderAction={this.renderAction}
          width={this.state.width}
        />
      </Grid>
    );
  }
}

Projects.propTypes = {
  projects: array.isRequired,
  deleteProject: func.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    projects: state.projects
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteProject: id => {
      dispatch(deleteProject(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Projects);

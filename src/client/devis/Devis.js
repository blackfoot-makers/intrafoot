import React, { PureComponent } from 'react';
import { array, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Grid, IconButton } from 'react-mdl';
import { bind } from 'decko';

import { requireAuth } from '../utils';
import DevisList from './items/DevisList';
import DevisAdd from './items/DevisAdd';

import { deleteDevis } from './devisActions';

class Devis extends PureComponent {
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
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  @bind
  deleteADevis(id) {
    this.props.deleteDevis(id);
  }

  @bind
  renderAction(data) {
    return (
      <div>
        <IconButton
          name="fullscreen"
          onClick={() => this.props.history.push(`/devis/${data._id}`)}
        />
        <IconButton
          name="edit"
          icon="edit"
          onClick={() => this.props.history.push(`/devis/edit/${data._id}`)}
        />
        <IconButton
          name="delete"
          icon="delete"
          onClick={() => {
            this.props.deleteDevis(data._id);
          }}
        />
      </div>
    );
  }

  render() {
    const devis = this.props.devis.map(data => ({
      action: data,
      ...data
    }));

    if (this.state.editMode) {
      return (
        <Grid>
          <DevisAdd />
        </Grid>
      );
    }

    return (
      <Grid style={{ width: this.state.width - (16 + 16) }}>
        <DevisList
          devis={devis}
          renderAction={this.renderAction}
          width={this.state.width}
          history={this.props.history}
        />
      </Grid>
    );
  }
}

Devis.propTypes = {
  devis: array.isRequired,
  deleteDevis: func.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
    devis: state.devis
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteDevis: id => {
      dispatch(deleteDevis(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Devis);

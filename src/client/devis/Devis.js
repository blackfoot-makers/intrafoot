import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, IconButton } from 'react-mdl';

import DevisList from './items/DevisList';
import DevisAdd from './items/DevisAdd';

import { deleteDevis } from './devisActions';

class Devis extends Component {

  constructor(props) {
    super(props);
    this.deleteADevis = this.deleteADevis.bind(this);
    this.renderAction = this.renderAction.bind(this);

    this.state = {
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

  deleteADevis(id) {
    this.props.deleteDevis(id);
  }

  renderAction(data) {
    return (
      <div>
        <IconButton name="fullscreen" onClick={() => browserHistory.push(`/devis/${data._id}`)} />
        <IconButton name="edit" icon="edit" onClick={() => browserHistory.push(`/devis/edit/${data._id}`)} />
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
        <DevisList devis={devis} renderAction={this.renderAction} width={this.state.width} />
      </Grid>
    );
  }
}

Devis.propTypes = {
  devis: PropTypes.array.isRequired,
  deleteDevis: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    projects: state.projects,
    devis: state.devis
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteDevis: (id) => {
      dispatch(deleteDevis(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Devis);

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, IconButton } from 'react-mdl';

import FactureList from './items/FactureList';
import FactureAdd from './items/FactureAdd';

import { deleteFacture } from './factureActions';

// Factures component - represents the factures lists
class Factures extends Component {

  constructor(props) {
    super(props);
    this.deleteAFacture = this.deleteAFacture.bind(this);
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

  deleteAFacture(id) {
    this.props.deleteFacture(id);
  }

  renderAction(data) {
    return (
      <div>
        <IconButton name="fullscreen" onClick={() => browserHistory.push(`/facture/${data._id}`)} />
        <IconButton name="edit" onClick={() => browserHistory.push(`/facture/edit/${data._id}`)} />
        <IconButton
          name="delete"
          onClick={() => {
            this.props.deleteFacture(data._id);
          }}
        />
      </div>
    );
  }

  render() {
    const factures = this.props.factures.map(data => ({
      action: data,
      ...data
    }));

    if (this.state.editMode) {
      return (
        <Grid>
          <FactureAdd />
        </Grid>
      );
    }

    return (
      <Grid style={{ width: this.state.width - (16 + 16) }}>
        <FactureList
          factures={factures}
          renderAction={this.renderAction}
          width={this.state.width}
        />
      </Grid>
    );
  }
}

Factures.propTypes = {
  factures: PropTypes.array.isRequired,
  deleteFacture: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    factures: state.factures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFacture: (id) => {
      dispatch(deleteFacture(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Factures);

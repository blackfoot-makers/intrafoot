import React, { PureComponent } from 'react';
import { array, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Grid, IconButton } from 'react-mdl';
import { bind } from 'decko';

import { requireAuth } from '../utils';
import FactureList from './items/FactureList';
import FactureAdd from './items/FactureAdd';

import { deleteFacture } from './factureActions';

// Factures component - represents the factures lists
class Factures extends PureComponent {
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
  deleteAFacture(id) {
    this.props.deleteFacture(id);
  }

  @bind
  renderAction(data) {
    return (
      <div>
        <IconButton
          name="fullscreen"
          onClick={() => this.props.history.push(`/facture/${data._id}`)}
        />
        <IconButton
          name="edit"
          onClick={() => this.props.history.push(`/facture/edit/${data._id}`)}
        />
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
  factures: array.isRequired,
  deleteFacture: func.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    factures: state.factures
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteFacture: id => {
      dispatch(deleteFacture(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Factures);

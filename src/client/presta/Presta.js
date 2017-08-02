import React, { PureComponent } from 'react';
import { array, func, shape } from 'prop-types';
import { connect } from 'react-redux';
import { Grid, IconButton } from 'react-mdl';
import { bind } from 'decko';

import { requireAuth } from '../utils';
import PrestaList from './items/PrestaList';
import PrestaAdd from './items/PrestaAdd';

import { deletePresta } from './prestaActions';

// Prestas component - represents the prestas lists
class Prestas extends PureComponent {
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
  deleteAPresta(id) {
    this.props.deletePresta(id);
  }

  @bind
  renderAction(data) {
    return (
      <div>
        <IconButton
          name="fullscreen"
          onClick={() => this.props.history.push(`/presta/${data._id}`)}
        />
        <IconButton
          name="edit"
          onClick={() => this.props.history.push(`/presta/edit/${data._id}`)}
        />
        <IconButton
          name="delete"
          onClick={() => {
            this.props.deletePresta(data._id);
          }}
        />
      </div>
    );
  }

  render() {
    const prestas = this.props.prestas.map(data => ({
      action: data,
      ...data
    }));

    if (this.state.editMode) {
      return (
        <Grid>
          <PrestaAdd />
        </Grid>
      );
    }

    return (
      <Grid style={{ width: this.state.width - (16 + 16) }}>
        <PrestaList
          prestas={prestas}
          renderAction={this.renderAction}
          width={this.state.width}
        />
      </Grid>
    );
  }
}

Prestas.propTypes = {
  prestas: array.isRequired,
  deletePresta: func.isRequired,
  history: shape({
    replace: func.isRequired,
    push: func.isRequired
  }).isRequired
};

function mapStateToProps(state) {
  return {
    prestas: state.prestas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePresta: id => {
      dispatch(deletePresta(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Prestas);

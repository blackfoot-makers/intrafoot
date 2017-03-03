import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { Grid, IconButton } from 'react-mdl';

import PrestaList from './items/PrestaList';
import PrestaAdd from './items/PrestaAdd';

import { deletePresta } from './prestaActions';

// Prestas component - represents the prestas lists
class Prestas extends Component {

  constructor(props) {
    super(props);
    this.deleteAPresta = this.deleteAPresta.bind(this);
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

  deleteAPresta(id) {
    this.props.deletePresta(id);
  }

  renderAction(data) {
    return (
      <div>
        <IconButton name="fullscreen" onClick={() => browserHistory.push(`/presta/${data._id}`)} />
        <IconButton name="edit" onClick={() => browserHistory.push(`/presta/edit/${data._id}`)} />
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
  prestas: PropTypes.array.isRequired,
  deletePresta: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  return {
    prestas: state.prestas
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deletePresta: (id) => {
      dispatch(deletePresta(id));
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Prestas);

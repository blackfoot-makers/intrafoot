import React, { PureComponent } from 'react';
import { func } from 'prop-types';
import { Textfield } from 'react-mdl';
import { connect } from 'react-redux';
import { bind } from 'decko';

import { findProject } from '../project/projectActions';

class SearchField extends PureComponent {
  state = {
    search: ''
  };

  @bind
  handleKeyPress(target) {
    if (target.charCode === 13) {
      this.props.findProject(this.state.search);
    }
  }

  render() {
    return (
      <Textfield
        value={this.state.search}
        onKeyPress={this.handleKeyPress}
        onChange={event => {
          const target = event.target;
          this.setState({
            search: target.value
          });
        }}
        floatingLabel
        label="Recherche par id de projet"
        expandable
        expandableIcon="search"
      />
    );
  }
}

SearchField.propTypes = {
  findProject: func.isRequired
};

const mapDispatchToProps = dispatch => ({
  findProject: searchId => dispatch(findProject(searchId))
});

export default connect(null, mapDispatchToProps)(SearchField);

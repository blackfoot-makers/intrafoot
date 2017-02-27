import React from 'react';
import { Textfield } from 'react-mdl';
import { connect } from 'react-redux';

import { findProject } from '../project/projectActions';

class SearchField extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      search: ''
    };
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

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
        onChange={(event) => {
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
  findProject: React.PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  findProject: searchId => (
    dispatch(findProject(searchId))
  )
});

export default connect(null, mapDispatchToProps)(SearchField);

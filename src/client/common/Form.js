import React from 'react';
import { Button } from 'react-mdl';
import { browserHistory } from 'react-router';

import { SubmitButton } from './InputButton';
import Field from './Field';

class Form extends React.Component {
  constructor(props) {
    super(props);
    const state = {};
    this.props.fields.map(({ fieldKey, defaultValue }) => {
      state[fieldKey] = defaultValue;
      return true;
    });

    this.state = state;

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleOtherChange = this.handleOtherChange.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleOtherChange(data, key) {
    this.setState({
      [key]: data
    });
  }

  // @todo: Handle error
  handleSubmit(event) {
    event.preventDefault();
    const devisData = {};
    this.props.fields.map((field) => {
      const value = this.state[field.fieldKey];
      if (value) {
        switch (field.type) {
          case 'date':
            devisData[field.fieldKey] = value._d;
            break;
          case 'bool':
            devisData[field.fieldKey] = value === 'true';
            break;
          case 'number':
            devisData[field.fieldKey] = parseFloat(value);
            break;
          default:
            devisData[field.fieldKey] = value;
        }
      }
      return true;
    });

    const notification = document.getElementById('snackbarIntraFoot');
    let msg = `${this.props.name} ajouté`;

    if (this.props.editMode) {
      this.props.editAction(devisData);
      msg = `${this.props.name} edité`;
    } else {
      this.props.addAction(devisData);
    }

    notification.MaterialSnackbar.showSnackbar({
      message: msg
    });
    this.props.redirectAfterSubmit();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {
          this.props.fields.map(({ defaultValue, ...props }, index) => {
            if (props.display && this.state[props.display] === 'false') return <div key={index} />;
            return (
              <Field
                key={index}
                value={this.state[props.fieldKey] || defaultValue}
                handleChange={this.handleChange}
                handleOtherChange={this.handleOtherChange}
                {...props}
              />
            );
          })
        }

        <br />
        <br />

        <Button
          raised
          colored
          component={SubmitButton}
        />
      </form>
    );
  }
}

Form.propTypes = {
  editAction: React.PropTypes.func.isRequired,
  editMode: React.PropTypes.bool,
  addAction: React.PropTypes.func.isRequired,
  redirectAfterSubmit: React.PropTypes.func.isRequired,
  name: React.PropTypes.string.isRequired,
  fields: React.PropTypes.array.isRequired
};

Form.defaultProps = {
  fields: [],
  redirectAfterSubmit: () => browserHistory.push('/')
};

export default Form;

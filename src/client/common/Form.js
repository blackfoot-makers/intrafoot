import React from 'react';
import { bool, string, array, func } from 'prop-types';
import { Button } from 'react-mdl';
import { bind } from 'decko';

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
  }

  componentWillReceiveProps(nextProps) {
    const state = this.state;
    let changed = false;

    nextProps.fields.map(({ fieldKey, defaultValue }, index) => {
      if (
        state[fieldKey] !== defaultValue &&
        this.props.fields[index].defaultValue === state[fieldKey]
      ) {
        state[fieldKey] = defaultValue;
        changed = true;
      }
      return true;
    });

    if (changed) {
      this.setState(state);
    }
  }

  @bind
  handleChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
    this.props.onChange({ [name]: value });
  }

  @bind
  handleOtherChange(data, key) {
    this.setState({
      [key]: data
    });
    this.props.onChange({ [key]: data });
  }

  handleError(okMsg, errorMsg) {
    const notification = document.getElementById('snackbarIntraFoot');

    notification.MaterialSnackbar.showSnackbar({
      message: errorMsg || okMsg
    });
    this.props.redirectAfterSubmit();
  }

  @bind
  handleSubmit(event) {
    event.preventDefault();
    const devisData = {};
    this.props.fields.map(field => {
      const value = this.state[field.fieldKey];
      if (value !== undefined) {
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

    if (this.props.editMode) {
      this.props.editAction(devisData, error => {
        this.handleError(`${this.props.name} edité`, error);
      });
    } else {
      this.props.addAction(devisData, error => {
        this.handleError(`${this.props.name} ajouté`, error);
      });
    }
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.fields.map(({ defaultValue, ...props }, index) => {
          if (!props.display || this.state[props.display] === 'true') {
            return (
              <Field
                key={index}
                value={this.state[props.fieldKey] || defaultValue}
                handleChange={this.handleChange}
                handleOtherChange={this.handleOtherChange}
                {...props}
              />
            );
          }
          return <div key={index} />;
        })}

        <br />
        <br />

        <Button raised colored component={SubmitButton} />
      </form>
    );
  }
}

Form.propTypes = {
  editAction: func.isRequired,
  editMode: bool,
  addAction: func.isRequired,
  redirectAfterSubmit: func.isRequired,
  name: string.isRequired,
  fields: array.isRequired,
  onChange: func.isRequired
};

Form.defaultProps = {
  fields: [],
  redirectAfterSubmit: () => {},
  onChange: data => console.log('Field change is ', data)
};

export default Form;

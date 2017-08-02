import React from 'react';
import { string, array, any, func } from 'prop-types';
import { Textfield, RadioGroup, Radio } from 'react-mdl';
import {
  SelectField,
  Option,
  AutoComplete,
  MultiSelectField
} from 'react-mdl-extra';
import DatePicker from 'react-datepicker';

const Field = ({
  type,
  fieldKey,
  options,
  label,
  value,
  handleOtherChange,
  handleChange,
  ...otherProps
}) => {
  switch (type) {
    case 'autocomplete':
      return (
        <AutoComplete
          onChange={data => {
            handleOtherChange(data, fieldKey);
          }}
          value={value}
          label={label}
          floatingLabel
          {...otherProps}
        />
      );
    case 'multiselect':
      return (
        <MultiSelectField
          onChange={data => {
            handleOtherChange(data, fieldKey);
          }}
          value={value}
          label={label}
          floatingLabel
          {...otherProps}
        >
          {options.map((data, index) =>
            <Option key={index} value={data._id}>
              {`${data.firstName} ${data.lastName}`}
            </Option>
          )}
        </MultiSelectField>
      );
    case 'select':
      return (
        <SelectField
          onChange={data => {
            handleOtherChange(data, fieldKey);
          }}
          value={value}
          label={label}
          floatingLabel
          offset={'-47px 0'}
          {...otherProps}
        >
          {options.map((data, index) =>
            <Option key={index} value={data._id}>
              {data.name || data.firstName || data.id}
            </Option>
          )}
        </SelectField>
      );
    case 'date':
      return (
        <div>
          <label htmlFor={fieldKey}>
            {label}
          </label>
          <DatePicker
            onChange={data => {
              handleOtherChange(data, fieldKey);
            }}
            name={fieldKey}
            id={fieldKey}
            selected={value}
            {...otherProps}
          />
        </div>
      );
    case 'number':
      return (
        <Textfield
          onChange={handleChange}
          name={fieldKey}
          label={label}
          pattern="-?[0-9]*(\.[0-9]+)?"
          value={value}
          {...otherProps}
        />
      );
    case 'bool':
      return (
        <div>
          <label htmlFor={fieldKey}>
            {label}
          </label>
          <RadioGroup
            onChange={handleChange}
            name={fieldKey}
            id={fieldKey}
            value={value}
          >
            <Radio value="true" ripple>
              Oui
            </Radio>
            <Radio value="false" ripple>
              Non
            </Radio>
          </RadioGroup>
        </div>
      );
    case 'text':
    default:
      return (
        <Textfield
          onChange={handleChange}
          value={value}
          label={label}
          name={fieldKey}
          {...otherProps}
        />
      );
  }
};

Field.propTypes = {
  type: string.isRequired,
  fieldKey: string.isRequired,
  label: string.isRequired,
  options: array,
  value: any.isRequired,
  handleChange: func.isRequired,
  handleOtherChange: func.isRequired
};

Field.defaultProps = {
  type: 'text'
};

export default Field;

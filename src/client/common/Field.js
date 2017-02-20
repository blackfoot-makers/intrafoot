import React from 'react';
import { Textfield, RadioGroup, Radio } from 'react-mdl';
import { SelectField, Option } from 'react-mdl-extra';
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
    case 'select':
      return (
        <SelectField
          onChange={(data) => { handleOtherChange(data, fieldKey); }}
          value={value}
          label={label}
          {...otherProps}
        >
          {
            options.map((data, index) =>
              (<Option key={index} value={data._id}>{data.name}</Option>)
            )
          }
        </SelectField>
      );
    case 'date':
      return (
        <div>
          <label htmlFor={fieldKey}>{label}</label>
          <DatePicker
            onChange={(data) => { handleOtherChange(data, fieldKey); }}
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
          <label htmlFor={fieldKey}>{label}</label>
          <RadioGroup
            onChange={handleChange}
            name={fieldKey}
            id={fieldKey}
            value={value}
          >
            <Radio value="true" ripple>Oui</Radio>
            <Radio value="false" ripple>Non</Radio>
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
  type: React.PropTypes.string.isRequired,
  fieldKey: React.PropTypes.string.isRequired,
  label: React.PropTypes.string.isRequired,
  options: React.PropTypes.array,
  value: React.PropTypes.any.isRequired,
  handleChange: React.PropTypes.func.isRequired,
  handleOtherChange: React.PropTypes.func.isRequired
};

Field.defaultProps = {
  type: 'text'
};

export default Field;

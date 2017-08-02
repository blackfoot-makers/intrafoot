import React from 'react';
import { string, node } from 'prop-types';

const InputButton = ({ type, value, children, ...otherProps }) =>
  React.createElement(
    'input',
    {
      type,
      value,
      ...otherProps
    },
    children
  );

InputButton.propTypes = {
  type: string.isRequired,
  value: string.isRequired,
  children: node
};

const SubmitButton = ({ children, ...otherProps }) =>
  React.createElement(
    InputButton,
    {
      type: 'submit',
      value: 'Submit',
      ...otherProps
    },
    children
  );

SubmitButton.propTypes = {
  children: node
};

export { InputButton, SubmitButton };

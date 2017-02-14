import React from 'react';

const InputButton = ({ type, value, children, ...otherProps }) => (
    React.createElement('input', {
      type,
      value,
      ...otherProps
    }, children)
);

InputButton.propTypes = {
  type: React.PropTypes.string.isRequired,
  value: React.PropTypes.string.isRequired,
  children: React.PropTypes.node
};

const SubmitButton = ({ children, ...otherProps }) => (
  React.createElement(InputButton, {
    type: 'submit',
    value: 'Submit',
    ...otherProps
  }, children)
);

SubmitButton.propTypes = {
  children: React.PropTypes.node
};

export {
  InputButton,
  SubmitButton
};

import React from 'react';
import PropTypes from 'prop-types';
import TextInputMaterial from './TextInput.material';

TextInput.propTypes = {
  label: PropTypes.string.isRequired,
  defaultValue: PropTypes.string,
  inputProps: PropTypes.object,
  value: PropTypes.string,
  name: PropTypes.string,
  type: PropTypes.string,
  onChange: PropTypes.func,
};

function TextInput({ label, name, defaultValue, inputProps = {}, value = '',
                   onChange, type }) {
  return (
    <TextInputMaterial
      name={name}
      label={label}
      type={type}
      defaultValue={defaultValue}
      inputProps={inputProps}
      value={value}
      onChange={onChange}
    />
  );
}

export default TextInput;

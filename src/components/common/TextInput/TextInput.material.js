import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import theme from '../../../lib/styles/material-ui/theme';

const useStyles = makeStyles(theme => ({
  textField: {
  }
}));

TextInputMaterial.propTypes = {};

function TextInputMaterial({ label, name, type, defaultValue, inputProps, value,
                           onChange}) {
  const classes = useStyles(theme);

  const isReadOnly = props => props && props.readOnly;

  if (isReadOnly(inputProps)) {
    return (
      <TextField
        label={label}
        name={name}
        type={type}
        defaultValue={defaultValue}
        className={classes.textField}
        margin="normal"
        InputProps={inputProps}
        variant="outlined"
        fullWidth
        onChange={onChange}
      />
    );
  }

  return (
    <TextField
      label={label}
      name={name}
      type={type}
      className={classes.textField}
      margin="normal"
      InputProps={inputProps}
      variant="outlined"
      value={value}
      fullWidth
      onChange={onChange}
    />
  );
}

export default TextInputMaterial;

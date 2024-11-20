import React from 'react';
import TextField from '@mui/material/TextField';

const InputField = ({ label, type = 'text', placeholder = '', value, onChange, fullWidth = true }) => {
  return (
    <TextField
      label={label}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth={fullWidth}
    />
  );
};

export default InputField;

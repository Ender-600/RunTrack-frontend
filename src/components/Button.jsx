import React from 'react';
import Button from '@mui/material/Button';

const CustomButton = ({ label, onClick, color = 'primary', variant = 'contained', size = 'medium' }) => {
  return (
    <Button variant={variant} color={color} size={size} onClick={onClick}>
      {label}
    </Button>
  );
};

export default CustomButton;

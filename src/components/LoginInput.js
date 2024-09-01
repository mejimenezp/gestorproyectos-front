import React from 'react';
import { FormControl, FormLabel, Input } from '@mui/joy';

function LoginInput({ label, type, value, onChange }) {
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input
        type={type}
        placeholder={label}
        value={value}
        onChange={onChange}
      />
    </FormControl>
  );
}

export default LoginInput;

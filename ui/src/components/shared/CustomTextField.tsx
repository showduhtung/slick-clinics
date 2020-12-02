import React from 'react';
import { TextField } from '@material-ui/core';
import { FormState } from '../../shared/types';

interface CustomTextFieldProps {
  size: string;
  autoFocus?: boolean;
  state: FormState;
  title: string;
  onChange: React.Dispatch<React.SetStateAction<FormState>>;
}

export const CustomTextField = ({
  size,
  autoFocus,
  state,
  title,
  onChange,
}: CustomTextFieldProps) => {
  return (
    <TextField
      variant="outlined"
      margin="normal"
      required
      fullWidth
      id={title}
      label={title[0].toUpperCase() + title.slice(1)}
      name={title}
      autoFocus={autoFocus}
      value={state.value}
      onChange={(event) => onChange({ ...state, value: event.target.value })}
      error={!state.valid}
      helperText={state.valid ? '' : state.message}
      multiline={size === 'big'}
      rows={size === 'big' ? 2 : 1}
    />
  );
};

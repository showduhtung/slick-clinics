import React, { FormEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';

import { CustomTextField } from '../shared';
import { FormState, ClinicData, HttpError } from '../../shared/types';
import { Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface NewClinicFormProps {
  open: boolean;
  onClose: (data?: ClinicData) => void;
  error: HttpError;
}

interface FormValueValidatingProps {
  state: FormState;
  setState: React.Dispatch<React.SetStateAction<FormState>>;
  title: string;
}

export const NewClinicForm = ({ open, onClose, error }: NewClinicFormProps) => {
  const classes = useStyles();
  const [name, setName] = useState<FormState>({
    value: 'Another Clinic',
    valid: true,
    message: null,
  });
  const [address, setAddress] = useState<FormState>({
    value: '335 Amwell Road, Hillsborough NJ 08844',
    valid: true,
    message: null,
  });

  const _isFilledOut = (formValues: FormValueValidatingProps[]): boolean =>
    formValues.filter((el) => {
      const { state, setState, title } = el;
      const valid = el.state.value.length !== 0;
      if (!valid)
        setState({ ...state, valid: false, message: `Please enter a valid ${title}` });
      else setState({ ...state, valid: true, message: '' });

      return !valid;
    }).length === 0;

  function resetAndClose() {
    setName({ value: '', valid: true, message: null });

    setAddress({ value: '', valid: true, message: null });
    onClose();
  }
  function handleSubmit(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    if (
      _isFilledOut([
        { state: name, setState: setName, title: 'name' },
        { state: address, setState: setAddress, title: 'address' },
      ])
    )
      onClose({ name: name.value, address: address.value });
  }
  return (
    <Dialog onClose={resetAndClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Create a new clinic</DialogTitle>
      {error && (
        <Typography color="error">{`${error?.status}: ${error?.message}`}</Typography>
      )}
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <CustomTextField
          size="small"
          autoFocus
          state={name}
          title="name"
          onChange={setName}
        />
        <CustomTextField
          size="big"
          state={address}
          title="address"
          onChange={setAddress}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </form>
    </Dialog>
  );
};

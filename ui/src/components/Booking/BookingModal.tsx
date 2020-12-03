import React, { FormEvent, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import { MenuItem, Select } from '@material-ui/core';

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
  select: {
    display: 'block',
    marginLeft: '1em',
    marginRight: '1em',
  },
  modal: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
    alignItems: 'center',
    minWidth: 85,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

interface BookingModalProps {
  open: boolean;
  onClose: (arg1: string) => void;
}

export const BookingModal = ({ open, onClose }: BookingModalProps) => {
  const classes = useStyles();
  const [time, setTime] = useState('');
  function handleClose() {
    onClose(time);
  }
  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
      <DialogTitle id="simple-dialog-title">Make a booking</DialogTitle>
      <div className={classes.modal}>
        <Select
          className={classes.select}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
            setTime(event.target.value)
          }
        >
          {timeOptions.map((option) => (
            <MenuItem value={option.value}>{option.display}</MenuItem>
          ))}
        </Select>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          onClick={() => handleClose()}
        >
          Submit
        </Button>
      </div>
    </Dialog>
  );
};

interface TimeOption {
  display: string;
  value: string;
}

const timeOptions: TimeOption[] = [
  { display: '9:00 AM', value: '9:00' },
  { display: '9:30 AM', value: '9:30' },
  { display: '10:00 AM', value: '10:00' },
  { display: '10:30 AM', value: '10:30' },
  { display: '11:00 AM', value: '11:00' },
  { display: '11:30 AM', value: '11:30' },
  { display: '12:00 PM', value: '12:00' },
  { display: '12:30 PM', value: '12:30' },
  { display: '1:00 PM', value: '13:00' },
  { display: '1:30 PM', value: '13:30' },
  { display: '2:00 PM', value: '14:00' },
  { display: '2:30 PM', value: '14:30' },
  { display: '3:00 PM', value: '15:00' },
  { display: '3:30 PM', value: '15:30' },
  { display: '4:00 PM', value: '16:00' },
  { display: '4:30 PM', value: '16:30' },
  { display: '5:00 PM', value: '17:00' },
  { display: '5:30 PM', value: '17:30' },
];

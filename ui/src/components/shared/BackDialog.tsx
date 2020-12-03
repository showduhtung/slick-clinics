import React, { useState } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Button, makeStyles } from '@material-ui/core';
import history from '../../shared/history';

const useStyles = makeStyles((theme) => ({
  buttonRow: { display: 'flex', justifyContent: 'space-between' },
}));

interface BackDialogProps {
  open: boolean;
  onChange: () => void;
}

export const BackDialog = ({ open, onChange }: BackDialogProps) => {
  const classes = useStyles();
  return (
    <>
      <Dialog aria-labelledby="back-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title">Welcome, please log in</DialogTitle>
        <div className={classes.buttonRow}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            onClick={() => history.goBack()}
          >
            Go Back
          </Button>
          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            onClick={() => onChange()}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </>
  );
};

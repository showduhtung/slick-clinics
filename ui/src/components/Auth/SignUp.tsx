import React, { FormEvent, useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

import { BackDialog, Copyright, CustomTextField } from '../shared';
import { FormState, PasswordState } from '../../shared/types';
import { createNewUser } from '../../store/actions';
import { PasswordForm } from '../shared/PasswordForm';
import { isValidEmail } from '../../shared/utilities';
import { RootState } from '../../store';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const SignUp = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const { loading, status } = useSelector((state: RootState) => state.user);

  const [firstName, setFirstName] = useState<FormState>({
    value: '',
    valid: true,
    message: '',
  });
  const [lastName, setLastName] = useState<FormState>({
    value: '',
    valid: true,
    message: '',
  });
  const [email, setEmail] = useState<FormState>({
    value: '',
    valid: true,
    message: '',
  });
  const [password, setPassword] = useState<PasswordState>({
    value: '',
    valid: true,
    visible: false,
    message: null,
  });
  const [dialogState, setDialogState] = useState(false);

  useEffect(() => {
    if (!loading && !dialogState && status.code) setDialogState(true);
  }, [loading]);

  function handleSubmit(event?: FormEvent<HTMLFormElement>): void {
    event?.preventDefault();
    setEmail({ ...email, valid: true, message: '' });
    setPassword({ ...password, valid: true, message: '' });
    if (isValidEmail(email.value) && password.value.length > 0) {
      dispatch(
        createNewUser(firstName.value, lastName.value, email.value, password.value),
      );
    } else {
      if (password.value.length === 0)
        setPassword({
          ...password,
          valid: false,
          message: 'Please enter a password',
        });
      if (!isValidEmail(email.value)) {
        setEmail({
          ...email,
          valid: false,
          message: 'Enter a valid email address.',
        });
      }
      if (email.value.length === 0)
        setEmail({
          ...email,
          valid: false,
          message: 'Please enter an email address.',
        });
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                size="small"
                autoFocus
                state={firstName}
                onChange={setFirstName}
                title={'First Name'}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <CustomTextField
                size="small"
                state={lastName}
                onChange={setLastName}
                title={'Last Name'}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomTextField
                size="small"
                state={email}
                onChange={setEmail}
                title={'Email Address'}
              />
            </Grid>
            <Grid item xs={12}>
              <PasswordForm
                name={'Password'}
                label={'Password'}
                password={password}
                handlePassword={setPassword}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={() => handleSubmit()}
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <RouterLink to={`/auth/login`}>Already have an account? Sign in</RouterLink>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
      <BackDialog open={dialogState} onChange={() => setDialogState(false)} />
    </Container>
  );
};

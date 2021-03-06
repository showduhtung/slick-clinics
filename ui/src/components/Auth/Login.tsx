import React, { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Link as RouterLink } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { checkCredentials } from '../../store/actions';
import { useSelector } from 'react-redux';
import { RootState } from '../../store';

import { FormState, PasswordState } from '../../shared/types';
import { Copyright, CustomTextField, PasswordForm, VisiblePassword } from '../shared';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<FormState>({
    // value: getLocalStorageState('auth')?.email,
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

  const { isTokenAvailable } = useSelector((state: RootState) => state.auth);

  function handleLogin(event?: FormEvent<HTMLFormElement>) {
    event?.preventDefault();
    dispatch(checkCredentials(email.value, password.value));
  }

  if (isTokenAvailable) return <Redirect to="/" />;

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleLogin}>
            <CustomTextField
              size="small"
              autoFocus
              state={email}
              onChange={setEmail}
              title={'Email Address'}
            />
            <PasswordForm
              name={'Password'}
              label={'Password'}
              password={password}
              handlePassword={setPassword}
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={() => handleLogin()}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                Forgot password?
              </Grid>
              <Grid item>
                <RouterLink to={`/auth/signUp`}>
                  Don't have an account? Sign Up
                </RouterLink>
              </Grid>
            </Grid>
            <Box mt={5}>
              <Copyright />
            </Box>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

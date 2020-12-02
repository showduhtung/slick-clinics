import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Login } from '../components/Auth';
// import { ErrorPage, Login, ResetPassword } from '../../components/Auth';
// import { AuthEmail } from '../../components/shared';

const Auth = () => {
  console.log("I'm in Auth");
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/login`}>
        <Login />
      </Route>
      {/* <Route path={`${path}/forgotPassword`}>
        <AuthEmail
          data={{
            history: true,
            title: 'Forgot Password',
            description:
              'Lost your password? Please enter your email address. You will receive a link to create a new password via email.',
            button: 'Reset Password',
          }}
        />
      </Route>
      <Route path={`${path}/expiredAccess`}>
        <ErrorPage />
      </Route>
      <Route path={`${path}/resetPassword`}>
        <ResetPassword />
      </Route> */}
    </Switch>
  );
};

export default Auth;

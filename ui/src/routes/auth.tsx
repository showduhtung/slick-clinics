import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { Login, SignUp } from '../components/Auth';

const Auth = () => {
  const { path } = useRouteMatch();
  return (
    <Switch>
      <Route path={`${path}/login`}>
        <Login />
      </Route>
      <Route path={`${path}/signUp`}>
        <SignUp />
      </Route>
    </Switch>
  );
};

export default Auth;

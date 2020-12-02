import React, { useEffect, useState } from 'react';
import { Router, Route, Switch, Redirect } from 'react-router-dom';

import history from './shared/history';
import Home from './routes/home';
import Auth from './routes/auth';
import { PrivateRoute } from './components/shared';

export interface IAppProps {}

export default function IApp(props: IAppProps) {
  console.log('App render');
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <PrivateRoute redirection="/auth/login" condition={'token'} path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

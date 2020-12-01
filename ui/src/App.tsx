import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './shared/history';
import Home from './components/Home';
import Auth from './routes/auth';
import { PrivateRoute } from './components/shared';
import { getClinics, getSummary } from './apis/Client';

export interface IAppProps {}

export default function IApp(props: IAppProps) {
  // useEffect(() => {
  //   getClinics((clinics: any) => console.log(clinics));
  //   getSummary((summary: any) => console.log(summary));
  // }, []);
  return (
    <Router history={history}>
      <Switch>
        <Route path="/auth">
          <Auth />
        </Route>
        <PrivateRoute path="/">
          <Home />
        </PrivateRoute>
      </Switch>
    </Router>
  );
}

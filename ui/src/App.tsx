import React, { useEffect, useState } from 'react';
import { Router, Route, Switch } from 'react-router-dom';

import history from './shared/history';
import { getClinics, getSummary } from './apis/Client';
import Home from './components/Home';
import Auth from './routes/auth';
import { PrivateRoute } from './components/shared';

export interface IAppProps {}

export default function IApp(props: IAppProps) {
  const [title, setTitle] = useState('');

  useEffect(() => {
    getClinics((clinics: any) => console.log(clinics));
    getSummary((summary: any) => setTitle(summary.content));
  }, []);
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

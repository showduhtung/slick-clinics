import React, { useEffect, useState } from 'react';
// import Auth from './routes/Auth';
import { Router, Route, Switch } from 'react-router-dom';
import { getClinics, getSummary } from './Client';
import history from './history';
// import { PrivateRoute } from './components/shared/PrivateRoute';
// import Main from './routes/Main';

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
        {/* <Route path="/auth">
          <Auth />
        </Route>
        <PrivateRoute path="/">
          <Main />
        </PrivateRoute> */}
      </Switch>
    </Router>
  );
}

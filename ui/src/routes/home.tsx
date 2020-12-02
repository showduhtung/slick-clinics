import React from 'react';
import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { PrivateRoute } from '../components/shared';
import { PatientContainer, AdminContainer } from '../containers';

const Home = () => {
  return (
    <Switch>
      <Route path="/patient">
        <PatientContainer />
      </Route>
      <PrivateRoute path="/admin" redirection="/patient" condition={'isAdmin'}>
        <AdminContainer />
      </PrivateRoute>
      <Route path="/" component={() => <Redirect to={'/admin'} />} />
    </Switch>
  );
};

export default Home;

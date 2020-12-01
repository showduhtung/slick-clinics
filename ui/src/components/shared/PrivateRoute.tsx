import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getLocalStorageState } from '../../shared/utilities';

export const PrivateRoute = ({ children, ...rest }: any) => {
  console.log(`Checking if you're allowed in here`);
  const token = getLocalStorageState('playclin_token');
  return (
    <Route
      {...rest}
      render={({ location }) => (token ? children : <Redirect to="/auth/login" />)}
    />
  );
};

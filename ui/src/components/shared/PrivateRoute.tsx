import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }: any) => {
  console.log(`Checking if you're allowed in here`);
  //   const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  const token = localStorage.getItem('slick-clinic-auth');
  return (
    <Route
      {...rest}
      render={({ location }) => (token ? children : <Redirect to="/auth/login" />)}
    />
  );
};

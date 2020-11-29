import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const PrivateRoute = ({ children, ...rest }: any) => {
  console.log(`Hey! You're not allowed here!! Get outta here!!!`);
  //   const isLoggedIn = useSelector(({ auth }) => auth.isLoggedIn);
  return (
    <Route
      {...rest}
      render={({ location }) => (false ? children : <Redirect to="/auth/login" />)}
    />
  );
};

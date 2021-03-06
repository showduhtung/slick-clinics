import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { getSplitToken } from '../../shared/utilities';

const validateUser = (condition: string): boolean => {
  const token = getSplitToken();
  const isAdmin = token && token[token?.length - 1] === 'true';
  return condition === 'isAdmin' ? !!isAdmin : token?.length > 0;
};

export const PrivateRoute = ({ children, redirection, condition, ...rest }: any) => {
  console.log("Checking if you're allowed in here", redirection);
  const validation = validateUser(condition);

  return (
    <Route
      {...rest}
      render={() => (validation ? children : <Redirect to={redirection} />)}
    />
  );
};

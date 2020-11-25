import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { getSummary, getClinics } from '../Client';
import { Button } from '@material-ui/core';

const Tech = ({ match }) => {
  return <div>Current Route: {match.params.tech}</div>;
};

export const Home = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    getSummary((summary) => setTitle(summary.content));
    getClinics((clinics) => console.log(clinics));
  }, []);

  return (
    <div className="App">
      <h1>Welcome to {title}</h1>
      <Button variant="contained">
        <Link to="/about">About Page</Link>
      </Button>
      <Route path="/:tech" component={Tech} />
    </div>
  );
};

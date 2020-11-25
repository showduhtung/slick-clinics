import React, { useEffect, useState } from 'react';
import { Route, Link } from 'react-router-dom';
import { Button } from '@material-ui/core';

import { getSummary, getClinics } from '../Client';

interface TechProps {
  match: any;
}

const Tech = ({ match }: TechProps) => {
  return <div>Current Route: {match.params.tech}</div>;
};

export const Home = () => {
  const [title, setTitle] = useState('');

  useEffect(() => {
    getSummary(({ content }: any) => setTitle(content));
    getClinics((clinics: any) => console.log(clinics));
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

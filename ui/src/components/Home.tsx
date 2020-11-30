import React, { useEffect } from 'react';
import { getClinics, getSummary } from '../apis/Client';

const Home = () => {
  // useEffect(() => {
  //   getClinics((clinics: any) => console.log(clinics));
  //   getSummary((summary: any) => console.log(summary));
  // }, []);
  return <div>Welcome Home Friend</div>;
};
export default Home;

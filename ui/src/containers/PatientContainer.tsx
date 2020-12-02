import { Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { getClinics, getSummary } from '../apis/Client';
import { ClinicCard } from '../components/Clinic';
import { Header } from '../components/shared';

export const PatientContainer = () => {
  useEffect(() => {
    getClinics();
    getSummary((summary: any) => console.log(summary));
  }, []);

  return (
    <>
      <Container>
        <Header profile={{ name: 'Patient' }} />
        I'm a Patient
        <ClinicCard />
      </Container>
    </>
  );
};

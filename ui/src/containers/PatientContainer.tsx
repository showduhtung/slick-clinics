import { Button, Container } from '@material-ui/core';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getClinics, getSummary } from '../apis/Client';
import { ClinicCard } from '../components/Clinic';
import { Header } from '../components/shared';
import { removeLocalStorageState } from '../shared/utilities';
import { logout } from '../store/actions';

export const PatientContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getClinics();
    getSummary((summary: any) => console.log(summary));
  }, []);

  const handleLogout = () => {
    removeLocalStorageState('playclin_token');
    dispatch(logout());
  };

  return (
    <>
      <Container>
        <Header profile={{ name: 'Patient' }} logout={handleLogout} />
        <ClinicCard />
      </Container>
    </>
  );
};

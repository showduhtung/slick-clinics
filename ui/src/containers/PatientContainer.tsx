import { Container } from '@material-ui/core';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Header } from '../components/shared';
import { removeLocalStorageState } from '../shared/utilities';
import { logout } from '../store/actions';

export const PatientContainer = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    removeLocalStorageState('playclin_token');
    dispatch(logout());
  };

  return (
    <>
      <Container>
        <Header profile={{ name: 'Patient' }} logout={handleLogout} />
        {/* <ClinicCard /> */}
      </Container>
    </>
  );
};

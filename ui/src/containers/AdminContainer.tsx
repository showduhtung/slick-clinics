import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { ClinicCard, NewClinicForm } from '../components/Clinic';
import { Header } from '../components/shared';
import { removeLocalStorageState } from '../shared/utilities';
import { bootstrapClinics, logout } from '../store/actions';
import { ClinicData } from '../shared/types';
import { RootState } from '../store';

export const AdminContainer = () => {
  const dispatch = useDispatch();

  const { data: clinicData } = useSelector((state: RootState) => state.clinic);
  const [open, setOpen] = useState(false);

  const handleClose = (newClinicData: ClinicData) => {
    // dispatch(createNewClinic(newClinicData));
    setOpen(false);
  };

  useEffect(() => {
    dispatch(bootstrapClinics());
  }, []);

  const handleLogout = () => {
    removeLocalStorageState('playclin_token');
    dispatch(logout());
  };

  return (
    <>
      <Container>
        <Header profile={{ name: 'Admin' }} logout={handleLogout} />
        {clinicData &&
          clinicData.map((clinic: ClinicData) => (
            <ClinicCard name={clinic.name} address={clinic.address} />
          ))}

        <Button onClick={() => setOpen(true)}>Create a new clinic</Button>
        <NewClinicForm
          open={open}
          onClose={(
            newClinicData: ClinicData = {
              name: null,
              address: null,
            },
          ) => handleClose(newClinicData)}
        />
      </Container>
    </>
  );
};

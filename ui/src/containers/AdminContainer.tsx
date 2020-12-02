import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { getClinics, getSummary } from '../apis/Client';
import { ClinicCard, NewClinicForm } from '../components/Clinic';
import { Header } from '../components/shared';
import { removeLocalStorageState } from '../shared/utilities';
import { logout } from '../store/actions';

interface NewClinicData {
  name: string | null;
  description: string | null;
  address: string | null;
}

export const AdminContainer = () => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const handleClose = (newClinicData: NewClinicData) => {
    console.log(newClinicData);
    // dispatch(createNewClinic(newClinicData));
    setOpen(false);
  };

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
        <Header profile={{ name: 'Admin' }} logout={handleLogout} />
        <ClinicCard />
        <Button onClick={() => setOpen(true)}>Create a new clinic</Button>
        <NewClinicForm
          open={open}
          onClose={(
            newClinicData: NewClinicData = {
              name: null,
              description: null,
              address: null,
            },
          ) => handleClose(newClinicData)}
        />
      </Container>
    </>
  );
};

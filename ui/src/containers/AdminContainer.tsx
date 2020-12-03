import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { ClinicCard, NewClinicForm } from '../components/Clinic';
import { Header } from '../components/shared';
import { removeLocalStorageState } from '../shared/utilities';
import { bootstrapClinics, createNewClinic, logout } from '../store/actions';
import { ClinicData } from '../shared/types';
import { RootState } from '../store';
import { getSummary } from '../apis/Client';

export const AdminContainer = () => {
  const dispatch = useDispatch();

  const { data: clinicData, loading, status } = useSelector(
    (state: RootState) => state.clinic,
  );
  const [formState, setFormState] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);

  const dispatchNewClinic = (newClinicData: ClinicData) => {
    dispatch(createNewClinic(newClinicData));
  };

  useEffect(() => {
    // if the modal is open, and it has finished loading and if there's an error message, display error message
    console.log(formState, loading, status);
    if (formState && !loading && status === 0) setFormState(false);
  }, [loading]);

  useEffect(() => {
    getSummary((summary: any) => console.log(summary));
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
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
          }}
        >
          {clinicData &&
            clinicData.map((clinic: ClinicData, idx) => (
              <div
                style={{ width: '30%', height: '30%' }}
                key={clinic.name + clinic.address.split(' ')[0] + idx}
              >
                <ClinicCard
                  id={idx}
                  name={clinic.name}
                  address={clinic.address}
                  expanded={activeCard}
                  expandChild={(id) => setActiveCard(id)}
                >
                  <div>Admin</div>
                </ClinicCard>
              </div>
            ))}
        </div>

        <Button onClick={() => setFormState(true)}>Create a new clinic</Button>
        <NewClinicForm
          open={formState}
          onClose={(
            newClinicData: ClinicData = {
              name: null,
              address: null,
            },
          ) => dispatchNewClinic(newClinicData)}
          error={status === 409 && { status: 409, message: 'Clinic already exists' }}
        />
      </Container>
    </>
  );
};

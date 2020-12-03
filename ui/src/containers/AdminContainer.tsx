import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Container } from '@material-ui/core';

import { ClinicCard, NewClinicForm } from '../components/Clinic';
import { BookingList } from '../components/Booking';
import { Header } from '../components/shared';
import { checkIsAdmin, removeToken } from '../shared/utilities';
import {
  bootstrapClinics,
  createNewClinic,
  logout,
  bootstrapBookingsAsAdmin,
  bootstrapUsers,
} from '../store/actions';
import { ClinicData, HttpError } from '../shared/types';
import { RootState } from '../store';

export const AdminContainer = () => {
  const dispatch = useDispatch();

  const isAdmin = checkIsAdmin();

  const { data: userData } = useSelector((state: RootState) => state.user);
  const { data: bookingData } = useSelector((state: RootState) => state.booking);
  const { data: clinicData, loading, status } = useSelector(
    (state: RootState) => state.clinic,
  );
  const [formState, setFormState] = useState(false);
  const [activeCard, setActiveCard] = useState(-1);
  const [formError, setFormError] = useState<HttpError | null>(null);

  const handleReset = () => {
    setFormState(false);
    setActiveCard(-1);
    setFormError(null);
  };

  const checkAvailableClinicName = (data: ClinicData): boolean =>
    clinicData.filter((cd) => cd.name === data.name).length == 0;

  const checkAvailableClinicAddress = (data: ClinicData): boolean =>
    clinicData.filter((cd) => cd.address === data.address).length === 0;

  const dispatchNewClinic = (newClinicData: ClinicData) => {
    if (!checkAvailableClinicName(newClinicData))
      setFormError({ code: null, message: 'You already have a clinic with this name' });
    else if (!checkAvailableClinicAddress(newClinicData))
      setFormError({
        code: null,
        message: "This is kinda awkward, but there's already a clinic at that address",
      });
    else {
      dispatch(createNewClinic(newClinicData));
      handleReset();
    }
  };

  useEffect(() => {
    // if the modal is open, and it has finished loading and if there's an error message, display error message
    if (formState && !loading && status.code === 0) setFormState(false);
  }, [loading]);

  useEffect(() => {
    dispatch(bootstrapUsers());
    dispatch(bootstrapClinics());
    dispatch(bootstrapBookingsAsAdmin());
  }, []);

  const handleLogout = () => {
    removeToken();
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

        <Button variant="contained" color="primary" onClick={() => setFormState(true)}>
          Create a new clinic
        </Button>
        <NewClinicForm
          open={formState}
          onClose={(
            newClinicData: ClinicData = {
              name: null,
              address: null,
            },
          ) => dispatchNewClinic(newClinicData)}
          error={formError}
        />
        {bookingData && clinicData && (
          <BookingList
            bookingData={bookingData}
            clinicData={clinicData}
            userData={userData}
            admin={isAdmin}
          />
        )}
      </Container>
    </>
  );
};

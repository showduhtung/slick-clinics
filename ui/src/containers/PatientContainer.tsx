import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { Booking, BookingList, BookingModal } from '../components/Booking';
import { Header } from '../components/shared';
import { getUserIdFromToken, removeLocalStorageState } from '../shared/utilities';
import { bootstrapClinics, logout } from '../store/actions';
import { RootState } from '../store';
import { ClinicData } from '../shared/types';
import { ClinicCard } from '../components/Clinic';
import { bootstrapBookings } from '../store/actions/bookingActions';

export const PatientContainer = () => {
  const dispatch = useDispatch();

  const { data: clinicData, loading: loadingClinics, status: clinicStatus } = useSelector(
    (state: RootState) => state.clinic,
  );

  const {
    data: bookingData,
    loading: loadingBookings,
    status: bookingStatus,
  } = useSelector((state: RootState) => state.booking);

  // for simplicity sake, we will only allow one accordion open at a time
  const [activeCard, setActiveCard] = useState(-1);
  const [modalState, setModalState] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // const error = useSelector()

  const handleLogout = () => {
    removeLocalStorageState('playclin_token');
    dispatch(logout());
  };

  const handleNewBookings = () => {
    // dispatch
    setModalState(false);
  };

  useEffect(() => {
    dispatch(bootstrapClinics());
    dispatch(bootstrapBookings(parseInt(getUserIdFromToken(), 10)));
  }, []);

  useEffect(() => {
    console.log(bookingData);
  }, [bookingData]);

  return (
    <>
      <Container>
        <Header profile={{ name: 'Patient' }} logout={handleLogout} />
        <div
          style={{
            display: 'flex',
            flexFlow: 'row wrap',
          }}
        >
          {clinicData &&
            clinicData.map((clinic: ClinicData, idx) => {
              const identifier = clinic.name + idx.toString();
              return (
                <div key={identifier} style={{ width: '30%', height: '30%' }}>
                  <ClinicCard
                    id={idx}
                    name={clinic.name}
                    address={clinic.address}
                    expanded={activeCard}
                    expandChild={(id) => setActiveCard(id)}
                  >
                    <>
                      <Booking setDate={setSelectedDate} />
                      <BookingModal open={modalState} onClose={handleNewBookings} />
                    </>
                  </ClinicCard>
                </div>
              );
            })}
        </div>
        <BookingList data={bookingData} clinicData={clinicData} />
      </Container>
    </>
  );
};

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { BookingCalendar, BookingList, BookingModal } from '../components/Booking';
import { Header } from '../components/shared';
import { getStrungDate, getUserIdFromToken, removeToken } from '../shared/utilities';
import { bootstrapClinics, logout } from '../store/actions';
import { RootState } from '../store';
import { ClinicData } from '../shared/types';
import { ClinicCard } from '../components/Clinic';
import { bootstrapBookings, createNewBooking } from '../store/actions/bookingActions';

export const PatientContainer = () => {
  const dispatch = useDispatch();

  const { data: clinicData } = useSelector((state: RootState) => state.clinic);
  const {
    data: bookingData,
    loading: bookingLoading,
    status: bookingStatus,
  } = useSelector((state: RootState) => state.booking);

  // for simplicity sake, we will only allow one accordion open at a time
  const [activeCard, setActiveCard] = useState(-1);
  const [selectedDate, setSelectedDate] = useState<string>(getStrungDate(new Date()));
  const [modalError, setModalError] = useState<string>('');

  const handleLogout = () => {
    dispatch(logout());
    removeToken();
  };

  const handleNewBookings = (time: string) => {
    dispatch(
      createNewBooking({
        time,
        date: selectedDate,
        clinicId: activeCard + 1,
        userId: getUserIdFromToken(),
      }),
    );
    // reset
    setActiveCard(-1);
    setSelectedDate(getStrungDate(new Date()));
  };

  useEffect(() => {
    dispatch(bootstrapClinics());
    dispatch(bootstrapBookings(getUserIdFromToken()));
  }, []);

  useEffect(() => {
    if (!bookingLoading) {
      if (bookingStatus.code < 300 && selectedDate !== getStrungDate(new Date()))
        if (bookingStatus.code > 299) {
          if (selectedDate !== getStrungDate(new Date())) {
            setModalError(status);
          } else {
            setSelectedDate(getStrungDate(new Date()));
          }
        }
    }
  }, [bookingStatus, bookingLoading]);

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
                      <BookingCalendar date={selectedDate} setDate={setSelectedDate} />
                      <BookingModal
                        open={selectedDate !== getStrungDate(new Date())}
                        onClose={handleNewBookings}
                      />
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

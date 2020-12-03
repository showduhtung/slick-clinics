import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container } from '@material-ui/core';

import { BookingCalendar, BookingList, BookingModal } from '../components/Booking';
import { Header } from '../components/shared';
import { getStrungDate, getUserIdFromToken, removeToken } from '../shared/utilities';
import { bootstrapClinics, logout } from '../store/actions';
import { RootState } from '../store';
import { ClinicData, HttpError } from '../shared/types';
import { ClinicCard } from '../components/Clinic';
import { bootstrapBookings, createNewBooking } from '../store/actions/bookingActions';

const today = new Date(
  new Date().getFullYear(),
  new Date().getMonth(),
  new Date().getDate(),
);
export const PatientContainer = () => {
  const dispatch = useDispatch();

  const { data: clinicData } = useSelector((state: RootState) => state.clinic);
  const { data: bookingData } = useSelector((state: RootState) => state.booking);

  // for simplicity sake, we will only allow one accordion open at a time
  const [activeCard, setActiveCard] = useState(-1);
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [modalError, setModalError] = useState<HttpError | null>(null);

  const handleLogout = () => {
    removeToken();
    dispatch(logout());
  };

  const handleReset = () => {
    setActiveCard(-1);
    setSelectedDate(today);
    setModalError(null);
  };

  const checkAvailableBookings = (time: string, date: Date): boolean =>
    bookingData.filter(
      (bd) => bd.time === time && new Date(bd.date).getTime() === date.getTime(),
    ).length === 0;

  const handleNewBookings = (time: string) => {
    if (!time) {
      setModalError({ code: null, message: 'Please pick a valid time' });
    } else if (!checkAvailableBookings(time, selectedDate)) {
      setModalError({ code: null, message: 'You already have a booking at this time' });
    } else {
      dispatch(
        createNewBooking({
          time,
          date: getStrungDate(selectedDate),
          clinicId: activeCard + 1,
          userId: getUserIdFromToken(),
        }),
      );
    }
  };

  useEffect(() => {
    dispatch(bootstrapClinics());
    dispatch(bootstrapBookings(getUserIdFromToken()));
  }, []);

  useEffect(() => {
    if (selectedDate !== today) {
      handleReset();
    }
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
                      <BookingCalendar date={selectedDate} setDate={setSelectedDate} />
                      <BookingModal
                        open={selectedDate !== today}
                        reset={handleReset}
                        onSubmit={handleNewBookings}
                        error={modalError}
                      />
                    </>
                  </ClinicCard>
                </div>
              );
            })}
        </div>
        {bookingData && clinicData && (
          <BookingList bookingData={bookingData} clinicData={clinicData} admin={false} />
        )}
      </Container>
    </>
  );
};

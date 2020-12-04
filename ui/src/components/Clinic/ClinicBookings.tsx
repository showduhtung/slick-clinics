import { List, ListItem } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { BookingData, ClinicData, UserData } from '../../shared/types';
import { convertDateToDisplay, reorganizedDate } from '../../shared/utilities';

interface ClinicBookingsProps {
  clinic: ClinicData;
  bookingData: BookingData[];
  userData?: UserData[];
}

interface DataInterface {
  time: string | null;
  date: string | null;
  user: string | null;
}

export const ClinicBookings = ({
  clinic,
  bookingData,
  userData,
}: ClinicBookingsProps) => {
  const data = mixBookClinicUsers(clinic, bookingData, userData);

  return (
    <div>
      {data.map((item) => {
        return (
          <>
            <List>
              <ListItem>
                {item.time} {item.date} {item.user}
              </ListItem>
            </List>
          </>
        );
      })}
    </div>
  );
};

const mixBookClinicUsers = (
  clinic: ClinicData,
  bookingData: BookingData[],
  userData?: UserData[],
): DataInterface[] => {
  const bookings: DataInterface[] = [];
  bookingData.map((booking) => {
    if (booking.clinicId == clinic.id) {
      const newTime = correctTime(booking.time);
      const user = userData && findById(userData, booking.userId);
      bookings.push({
        time: newTime,
        date: reorganizedDate(convertDateToDisplay(new Date(booking.date))),
        user: userData && `${user.firstName} ${user.lastName}`,
      });
    }
  });

  return bookings;
};

const correctTime = (time: string): string => {
  const hour = parseInt(time.split(':')[0], 10);
  const ampm = hour > 11 ? 'PM' : 'AM';
  const minute = parseInt(time.split(':')[1], 10) === 0 ? '00' : '30';
  const newHour = hour > 12 ? hour - 12 : hour;
  return `${newHour.toString()}:${minute} ${ampm}`;
};

const findById = (arr: any[], target: number) =>
  arr.filter((el: any) => el.id === target)[0];

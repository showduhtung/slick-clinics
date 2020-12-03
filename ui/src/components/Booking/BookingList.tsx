import React, { useEffect, useState } from 'react';
import { BookingData, ClinicData } from '../../shared/types';

interface BookingListProps {
  data: BookingData[];
  clinicData: ClinicData[];
}

interface DataInterface {
  clinic: string;
  time: number;
}

// const defaultBookings: BookingData[] = [{ id: null, clinicId: null, time: null }];
// const defaultClinics: ClinicData[] = [{ id: null, clinicId: null, time: null }];

export const BookingList = ({ data, clinicData }: BookingListProps) => {
  const [bookings, setBookings] = useState(mixBookingClinic(data, clinicData));
  useEffect(() => {
    if ((data.length > 0, clinicData.length > 0)) {
      const newData = mixBookingClinic(data, clinicData);
      setBookings(newData);
    }
  }, [data]);
  return <>{data && JSON.stringify(bookings)}</>;
};

const mixBookingClinic = (
  data: BookingData[],
  clinicData: ClinicData[],
): DataInterface[] => {
  const reformedBookings: DataInterface[] = [];
  data.map((booking) => {
    const newTime = booking.time; // reformated
    reformedBookings.push({
      clinic: clinicData[booking.clinicId].name,
      time: newTime,
    });
  });
  console.log(reformedBookings);
  return reformedBookings;
};

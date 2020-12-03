import React, { useEffect, useState } from 'react';
import { BookingData, ClinicData } from '../../shared/types';

interface BookingListProps {
  data: BookingData[];
  clinicData: ClinicData[];
}

interface DataInterface {
  clinic: string | null;
  time: number | null;
}

const defaultBookings: BookingData[] = [{ id: null, clinicId: null, time: null }];
const defaultClinics: ClinicData[] = [{ name: '', address: '' }];

export const BookingList = ({ data, clinicData }: BookingListProps) => {
  console.log(1);
  const [bookings, setBookings] = useState(
    mixBookingClinic((data = defaultBookings), (clinicData = defaultClinics)),
  );

  useEffect(() => {
    if ((data.length > 0, clinicData.length > 0)) {
      const newData = mixBookingClinic(data, clinicData);
      setBookings(newData);
    }
  }, [data, clinicData]);
  return <>{data && JSON.stringify(bookings)}</>;
};

const mixBookingClinic = (
  data: BookingData[],
  clinicData: ClinicData[],
): DataInterface[] => {
  console.log(2, data, clinicData);
  const reformedBookings: DataInterface[] = [];
  data.map((booking) => {
    console.log(3);
    const newTime = booking.time; // reformated
    console.log(4, clinicData[booking.clinicId && 0]);
    const clinic = clinicData && booking && clinicData[booking.clinicId && 0];
    reformedBookings.push({
      clinic: clinic?.name,
      time: newTime,
    });
    console.log(5);
  });
  console.log(6);
  return reformedBookings;
};

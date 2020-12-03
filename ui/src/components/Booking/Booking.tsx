import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

interface BookingProps {
  setDate: (arg1: Date) => void;
}

export const Booking = ({ setDate }: BookingProps) => {
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <Calendar onChange={(date: Date) => setDate(date)} value={value} />
    </>
  );
};

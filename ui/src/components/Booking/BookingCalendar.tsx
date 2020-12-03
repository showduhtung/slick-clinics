import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getStrungDate } from '../../shared/utilities';

interface BookingProps {
  date: Date;
  setDate: (arg1: Date) => void;
}

export const BookingCalendar = ({ date, setDate }: BookingProps) => {
  return (
    <>
      <Calendar value={date} onChange={(value: Date) => setDate(value)} />
    </>
  );
};

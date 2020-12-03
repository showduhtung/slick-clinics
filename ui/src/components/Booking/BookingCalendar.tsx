import React, { useState, useEffect } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { getStrungDate } from '../../shared/utilities';

interface BookingProps {
  date: string;
  setDate: (arg1: string) => void;
}

export const BookingCalendar = ({ date, setDate }: BookingProps) => {
  return (
    <>
      <Calendar
        value={new Date(date)}
        onChange={(value: Date) => setDate(getStrungDate(value))}
      />
    </>
  );
};

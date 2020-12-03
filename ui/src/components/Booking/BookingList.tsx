import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BookingData, ClinicData } from '../../shared/types';
import { convertDateToDisplay, reorganizedDate } from '../../shared/utilities';

interface BookingListProps {
  data: BookingData[];
  clinicData: ClinicData[];
}
interface DataInterface {
  clinic: string | null;
  time: string | null;
  date: string | null;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const BookingList = ({ data, clinicData }: BookingListProps) => {
  const classes = useStyles();
  const [bookings, setBookings] = useState<DataInterface[]>();

  useEffect(() => {
    if ((data.length > 0, clinicData.length > 0)) {
      const newData = mixBookingClinic(data, clinicData);
      setBookings(newData);
    }
  }, [data, clinicData]);
  return (
    <>
      <h1>List of Bookings</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="clinical table">
          <TableHead>
            <TableRow>
              <TableCell>Clinic Name</TableCell>
              <TableCell align="right">Date</TableCell>
              <TableCell align="right">Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {bookings?.map((booking, idx) => (
              <TableRow key={booking.clinic + booking.time + idx}>
                <TableCell component="th" scope="row">
                  {booking.clinic}
                </TableCell>
                <TableCell align="right">{booking.date}</TableCell>
                <TableCell align="right">{booking.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

const mixBookingClinic = (
  data: BookingData[],
  clinicData: ClinicData[],
): DataInterface[] => {
  const reformedBookings: DataInterface[] = [];
  if (clinicData.length > 0 && data.length > 0) {
    data.map((booking) => {
      const newTime = correctTime(booking.time);
      const checkClinicId = booking.clinicId - 1 > -1;
      const clinicIndex = checkClinicId ? booking.clinicId - 1 : 0;
      const clinic = clinicData[clinicIndex];
      reformedBookings.push({
        clinic: clinic.name,
        time: newTime,
        date: reorganizedDate(convertDateToDisplay(new Date(booking.date))),
      });
    });
  }
  return reformedBookings;
};

const correctTime = (time: string): string => {
  const hour = parseInt(time.split(':')[0], 10);
  const ampm = hour > 11 ? 'PM' : 'AM';
  const minute = parseInt(time.split(':')[1], 10) === 0 ? '00' : '30';
  const newHour = hour > 12 ? hour - 12 : hour;
  return `${newHour.toString()}:${minute} ${ampm}`;
};

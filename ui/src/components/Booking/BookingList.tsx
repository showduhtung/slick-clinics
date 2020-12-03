import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { BookingData, ClinicData, UserData } from '../../shared/types';
import { convertDateToDisplay, reorganizedDate } from '../../shared/utilities';

interface BookingListProps {
  bookingData: BookingData[];
  clinicData: ClinicData[];
  userData?: UserData[];
  admin: boolean;
}
interface DataInterface {
  clinic: string | null;
  time: string | null;
  date: string | null;
  user?: UserData | null;
}

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export const BookingList = ({
  bookingData,
  clinicData,
  userData,
  admin,
}: BookingListProps) => {
  const classes = useStyles();
  const [bookings, setBookings] = useState<DataInterface[]>();

  useEffect(() => {
    if ((bookingData?.length > 0, clinicData?.length > 0)) {
      const newData =
        userData?.length > 0
          ? mixBookClinicUsers(bookingData, clinicData, userData)
          : mixBookClinicUsers(bookingData, clinicData);
      setBookings(newData);
    }
  }, [bookingData, clinicData, userData]);
  return (
    <>
      <h1>List of Bookings</h1>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="clinical table">
          <TableHead>
            <TableRow>
              <TableCell>Clinic Name</TableCell>
              {userData?.length > 0 && (
                <>
                  <TableCell align="right">User</TableCell>
                  <TableCell align="right">Email</TableCell>
                </>
              )}
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
                {userData?.length > 0 && (
                  <>
                    <TableCell align="right">{`${booking.user?.firstName} ${booking.user?.lastName}`}</TableCell>
                    <TableCell align="right">{booking.user?.email}</TableCell>
                  </>
                )}
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

const mixBookClinicUsers = (
  bookingData: BookingData[],
  clinicData: ClinicData[],
  userData?: UserData[],
): DataInterface[] => {
  const reformedBookings: DataInterface[] = [];
  if (clinicData?.length > 0 && bookingData?.length > 0) {
    bookingData.map((booking) => {
      const newTime = correctTime(booking.time);
      const clinic = findById(
        clinicData,
        booking.clinicId - 1 > -1 ? booking.clinicId : 0,
      );
      const user = userData && findById(userData, booking.userId);
      reformedBookings.push({
        clinic: clinic.name,
        time: newTime,
        date: reorganizedDate(convertDateToDisplay(new Date(booking.date))),
        user: userData && user,
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

const findById = (arr: any[], target: number) =>
  arr.filter((el: any) => el.id === target)[0];

import axios from 'axios';
import { NewBookingPayload } from '../shared/types';
import { getToken } from '../shared/utilities';
import { checkStatus } from './Client';

const token = getToken();
axios.defaults.headers.common['Authorization'] = token;

export const getBookings = async (userId: number) => {
  const res = await axios.get(`/api/bookings/${userId}/userId`);
  checkStatus(res);
  return res;
};

export const postBooking = async (data: NewBookingPayload) => {
  const res = await axios.post('/api/bookings', data);
  checkStatus(res);
  return res;
};

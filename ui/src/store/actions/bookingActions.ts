import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { postBooking, getBookings } from '../../apis/bookings';
import { BookingData, LoadingPayload } from '../../shared/types';
import { errorDataExtractor } from '../../shared/utilities';
import {
  BookingActionTypes,
  BOOKING_LOADING,
  CREATE_BOOKING,
  GET_BOOKING,
} from '../types';

export const getBooking = (data: BookingData[]): BookingActionTypes => ({
  type: GET_BOOKING,
  payload: data,
});

export const createBooking = (payload: BookingData): BookingActionTypes => ({
  type: CREATE_BOOKING,
  payload,
});

export const loadingBooking = (payload: LoadingPayload): BookingActionTypes => ({
  type: BOOKING_LOADING,
  payload,
});

export const bootstrapBookings = (
  userId: number,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    const { data } = await getBookings(userId);
    console.log('bootstrapping bookings', userId, data);
    dispatch(getBooking(data));
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};

export const createNewBooking = (
  newBookingData: BookingData,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    dispatch(loadingBooking({ loading: true, status: 0 }));
    const { data, status } = await postBooking(newBookingData);
    if (data) {
      dispatch(createBooking(data));
      dispatch(loadingBooking({ loading: false, status: 0 }));
    }
    if (status === 409) loadingBooking({ loading: false, status });
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};

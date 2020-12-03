import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { postBooking, getBookings } from '../../apis/bookings';
import {
  BookingData,
  HttpError,
  LoadingPayload,
  NewBookingPayload,
} from '../../shared/types';
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
    dispatch(getBooking(data));
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};

export const createNewBooking = (
  newBookingPayload: NewBookingPayload,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    dispatch(loadingBooking({ loading: true, status: { code: 0, message: '' } }));
    const { data, status, statusText } = await postBooking(newBookingPayload);
    if (data) {
      dispatch(createBooking(data));
      dispatch(loadingBooking({ loading: false, status: { code: 0, message: '' } }));
    }
    if (status === 409)
      loadingBooking({
        loading: false,
        status: { code: 409, message: 'Booking already exists' },
      });
    if (status > 0) {
      loadingBooking({ loading: false, status: { code: status, message: statusText } });
    }
  } catch (error) {
    const { message, code }: HttpError = errorDataExtractor(error);
    dispatch(
      loadingBooking({
        loading: false,
        status: { code, message },
      }),
    );
    console.error({ message, code });
  }
};

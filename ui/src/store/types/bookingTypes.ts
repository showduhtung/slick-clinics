import { BookingData, HttpError, LoadingPayload } from '../../shared/types';

/** Action Types */
export const GET_BOOKING = 'GET_BOOKING';
export const CREATE_BOOKING = 'CREATE_BOOKING';
export const BOOKING_LOADING = 'BOOKING_LOADING';

/** Action Creators */
interface GetBookingAction {
  type: typeof GET_BOOKING;
  payload: BookingData[];
}

interface CreateBookingAction {
  type: typeof CREATE_BOOKING;
  payload: BookingData;
}
interface BookingLoadingAction {
  type: typeof BOOKING_LOADING;
  payload: LoadingPayload;
}

export type BookingActionTypes =
  | GetBookingAction
  | CreateBookingAction
  | BookingLoadingAction;

/** Reducer State */
export interface BookingState {
  data: BookingData[];
  loading: boolean;
  status: HttpError;
}

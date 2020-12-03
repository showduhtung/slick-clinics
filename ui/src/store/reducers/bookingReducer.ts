import {
  BookingActionTypes,
  BookingState,
  BOOKING_LOADING,
  CREATE_BOOKING,
  GET_BOOKING,
} from '../types';

const initialState: BookingState = { data: [], loading: false, status: 0 };

export const BOOKINGReducer = (
  state = initialState,
  action: BookingActionTypes,
): BookingState => {
  switch (action.type) {
    case GET_BOOKING:
      return { ...state, data: action.payload };
    case CREATE_BOOKING:
      return { ...state, data: [...state.data, action.payload], status: null };
    case BOOKING_LOADING:
      const { loading, status } = action.payload;
      return { ...state, loading, status };
    default:
      return state;
  }
};

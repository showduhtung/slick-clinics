import { ClinicActionTypes, ClinicState, GET_CLINIC } from '../types';

const initialState: ClinicState = { data: [] };

export const clinicReducer = (
  state = initialState,
  action: ClinicActionTypes,
): ClinicState => {
  switch (action.type) {
    case GET_CLINIC:
      return { ...state, data: action.payload };
    default:
      return state;
  }
};

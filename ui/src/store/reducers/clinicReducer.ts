import {
  ClinicActionTypes,
  ClinicState,
  CLINIC_LOADING,
  CREATE_CLINIC,
  GET_CLINIC,
} from '../types';

const initialState: ClinicState = { data: [], loading: false, status: 0 };

export const clinicReducer = (
  state = initialState,
  action: ClinicActionTypes,
): ClinicState => {
  switch (action.type) {
    case GET_CLINIC:
      return { ...state, data: action.payload };
    case CREATE_CLINIC:
      return { ...state, data: [...state.data, action.payload], status: null };
    case CLINIC_LOADING:
      const { loading, status } = action.payload;
      return { ...state, loading, status };
    default:
      return state;
  }
};

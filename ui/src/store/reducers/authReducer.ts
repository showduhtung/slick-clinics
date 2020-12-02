import { AuthActionTypes, LOGIN, LOGOUT, AuthState } from '../types';

const initialState: AuthState = {
  isTokenAvailable: false,
};

export const authReducer = (state = initialState, action: AuthActionTypes): AuthState => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        isTokenAvailable: true,
      };
    case LOGOUT:
      return {
        ...state,
        isTokenAvailable: false,
      };
    default:
      return state;
  }
};

import { UserActionTypes, UserState, USER_LOADING, GET_USER } from '../types';

const initialState: UserState = {
  data: [],
  loading: false,
  status: { code: 0, message: '' },
};

export const userReducer = (state = initialState, action: UserActionTypes): UserState => {
  switch (action.type) {
    case GET_USER:
      return { ...state, data: action.payload };
    case USER_LOADING:
      const { loading, status } = action.payload;
      return { ...state, loading, status };
    default:
      return state;
  }
};

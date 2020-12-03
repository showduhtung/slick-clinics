import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllUsers, postUser } from '../../apis';
import { UserData, LoadingPayload } from '../../shared/types';
import { errorDataExtractor } from '../../shared/utilities';
import { UserActionTypes, USER_LOADING, GET_USER } from '../types';

export const getUser = (data: UserData[]): UserActionTypes => ({
  type: GET_USER,
  payload: data,
});

export const loadingUser = (payload: LoadingPayload): UserActionTypes => ({
  type: USER_LOADING,
  payload,
});

export const bootstrapUsers = (): ThunkAction<any, any, any, Action> => async (
  dispatch,
) => {
  try {
    const { data } = await getAllUsers();
    dispatch(getUser(data));
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};

export const createNewUser = (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): ThunkAction<any, any, any, Action> => async (dispatch) => {
  try {
    dispatch(loadingUser({ loading: true, status: { code: 0, message: '' } }));
    const { data } = await postUser(firstname, lastname, email, password);
    if (data)
      dispatch(loadingUser({ loading: false, status: { code: 204, message: '' } }));
  } catch (error) {
    const errorData = errorDataExtractor(error);
    console.error(errorData);
  }
};

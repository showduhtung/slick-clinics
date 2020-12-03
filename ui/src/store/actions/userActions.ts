import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { getAllUsers } from '../../apis';
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

import axios from 'axios';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { authenticateLogin } from '../../apis';
import { errorDataExtractor, setLocalStorageState } from '../../shared/utilities';
import { AuthActionTypes, LOGIN, LOGOUT } from '../types';
import history from '../../shared/history';

export const login = (): AuthActionTypes => ({ type: LOGIN });
export const logout = (): AuthActionTypes => ({ type: LOGOUT });

export const onValidated = (): ThunkAction<any, any, any, Action> => (dispatch) => {
  dispatch(login());
  history.push('/');
};

export const checkCredentials = (
  email: string,
  password: string,
): ThunkAction<any, any, any, Action> => {
  return async (dispatch) => {
    try {
      const { accessToken } = (await authenticateLogin(email, password)).data;
      if (accessToken) {
        axios.defaults.headers.common['Authorization'] = accessToken;
        setLocalStorageState('playclin_token', accessToken);
        dispatch(onValidated());
      }
    } catch (error) {
      const errorData = errorDataExtractor(error);
      console.error(errorData);
    }
  };
};

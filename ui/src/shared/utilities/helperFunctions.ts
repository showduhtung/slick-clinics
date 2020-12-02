import { HttpError, JWTDataType } from '../types/models';
import { AxiosResponse } from 'axios';

export function errorDataExtractor(error: any): HttpError {
  return {
    message: error.response?.data?.message,
    status: error.response?.status,
  };
}

export const getToken: () => string | undefined = () =>
  JSON.parse(localStorage.getItem('playclin_token_state'));

export const getSplitToken = () => getToken()?.split('-');

export const getUserIdFromToken = () => getSplitToken()[0];

export const setLocalStorageState = (type: string, newState: object) =>
  localStorage.setItem(`${type}_state`, JSON.stringify(newState));

export const removeLocalStorageState = (type: string) =>
  localStorage.removeItem(`${type}_state`);

export function isValidEmail(emailValue: string): boolean {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(emailValue).toLowerCase());
}

export const checkStatus = (response: AxiosResponse) => {
  if (response.status >= 200 && response.status < 300) return response;
  const error = new Error(`HTTP Error ${response.statusText}`);
  console.log(error);
  throw error;
};

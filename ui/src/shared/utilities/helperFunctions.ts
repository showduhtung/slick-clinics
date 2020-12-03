import { HttpError } from '../types/models';
import { AxiosResponse } from 'axios';

export function errorDataExtractor(error: any): HttpError {
  return {
    message: error.response?.data?.message,
    code: error.response?.status,
  };
}

export const getToken: () => string | undefined = () =>
  JSON.parse(localStorage.getItem('playclin_token_state'));

export const getSplitToken = () => getToken()?.split('-');

export const getUserIdFromToken: () => number | null = () =>
  getSplitToken && parseInt(getSplitToken()[0], 10);

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

export const getStringDate = (date: Date): string =>
  `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

export const getStrungDate = (date: Date): string =>
  contrivedDateString(date.getFullYear()) +
  '-' +
  contrivedDateString(date.getMonth() + 1) +
  '-' +
  contrivedDateString(date.getDate() + 1);

export const dataReadyStrungDate = (date: string): string => {
  let splitDate = date.split('-');
  let newDate = [splitDate[0], splitDate[1], (parseInt(splitDate[2], 10) - 1).toString()];
  return newDate.join('-');
};

export const reorganizedDate = (date: string): string => {
  let splitDate = date.split('-');
  let newDate = [splitDate[1], splitDate[2], splitDate[0]];
  return newDate.join('-');
};

export const convertDateToDisplay = (date: Date): string => {
  const month = idxToMonth[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();
  return `${month} ${day}, ${year}`;
};

const contrivedDateString = (num: number): string =>
  num < 10 ? `0${num.toString()}` : num.toString();

export function removeToken() {
  removeLocalStorageState('playclin_token');
}

const idxToMonth = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec',
];

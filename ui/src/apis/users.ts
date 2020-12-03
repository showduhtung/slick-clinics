import axios, { AxiosResponse } from 'axios';
import { getToken } from '../shared/utilities';

const token = getToken();

export const getAllUsers = async (): Promise<AxiosResponse> =>
  await axios.get('/api/users');

export const postUser = async (
  firstname: string,
  lastname: string,
  email: string,
  password: string,
): Promise<AxiosResponse> =>
  await axios.post('/api/user', { firstname, lastname, email, password });

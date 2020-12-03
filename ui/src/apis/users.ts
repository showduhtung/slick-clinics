import axios, { AxiosResponse } from 'axios';
import { getToken } from '../shared/utilities';

const token = getToken();

export const getAllUsers = async (): Promise<AxiosResponse> =>
  await axios.get('/api/users');

import axios from 'axios';
import { getToken } from '../shared/utilities';
import { checkStatus } from './Client';

const token = getToken();
axios.defaults.headers.common['authorization'] = token;

export const getClinics = async () => {
  const res = await axios.get('/api/clinics');
  checkStatus(res);
  return res;
};

import axios from 'axios';
import { ClinicData } from '../shared/types';
import { getToken } from '../shared/utilities';
import { checkStatus } from './Client';

const token = getToken();
axios.defaults.headers.common['authorization'] = token;

export const getClinics = async () => {
  const res = await axios.get('/api/clinics');
  checkStatus(res);
  return res;
};

export const postClinic = async (data: ClinicData) => {
  console.log(token);
  const res = await axios.post('/api/clinics', data);
  checkStatus(res);
  return res;
};

import axios, { AxiosResponse } from 'axios';
import { getLocalStorageState, setLocalStorageState } from '../shared/utilities';

const token = getLocalStorageState('playclin_token');
axios.defaults.headers.common['authorization'] = token;

export const authenticateLogin = async (
  email: string,
  password: string,
): Promise<AxiosResponse> => {
  const res = await axios.post('/api/login', { email, password });
  if (res.data.accessToken) {
    axios.defaults.headers.common['authorization'] = token;
    setLocalStorageState('playclin_token', res.data.accessToken);
  }
  return res;
};

import axios, { AxiosResponse } from 'axios';
import { getToken, setLocalStorageState } from '../shared/utilities';

export const authenticateLogin = async (
  email: string,
  password: string,
): Promise<AxiosResponse> => {
  const res = await axios.post('/api/login', { email, password });
  if (res.data.accessToken) {
    axios.defaults.headers.common['Authorization'] = res.data.accessToken;
    setLocalStorageState('playclin_token', res.data.accessToken);
  }
  return res;
};

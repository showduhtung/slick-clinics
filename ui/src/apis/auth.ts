import axios, { AxiosResponse } from 'axios';

export const authenticateLogin = async (
  email: string,
  password: string,
): Promise<AxiosResponse> => {
  const res = await axios.post('/api/login', { email, password });
  if (res.data.accessToken)
    localStorage.setItem('slick-clinic-auth', res.data.accessToken);
  return res;
};

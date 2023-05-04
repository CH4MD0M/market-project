import { API_URL } from '@utils/constants';
import { instance } from './instance';

export const postSignIn = async (email: string, password: string, doNotLogout: boolean) => {
  const response = await instance.post(API_URL.USER.LOGIN, { email, password, doNotLogout });
  const data = await response;
  return data;
};

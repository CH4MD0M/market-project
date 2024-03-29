import { API_URL } from '@constants/.';
import { instance } from './instance';

export const postSignOut = async () => {
  const response = await instance.get(API_URL.USER.LOGOUT);

  return response;
};

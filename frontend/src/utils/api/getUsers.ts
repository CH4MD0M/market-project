import { API_URL } from '@utils/constants/API_URL';
import { instance } from './instance';

export const getAllUsers = async (signal: AbortSignal) => {
  const response = await instance.get(API_URL.USER.GET_ALL_USERS, { signal });
  const data = await response;

  return data;
};

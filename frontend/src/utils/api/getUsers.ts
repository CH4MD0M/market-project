import { API_URL } from '@constants/.';
import { instance } from './instance';

const getSingleUser = async (userId: string) => {
  const { data } = await instance.get(API_URL.USER.GET_SINGLE_USER(userId));
  return data;
};

const getAllUsers = async (signal: AbortSignal) => {
  const response = await instance.get(API_URL.USER.GET_ALL_USERS, { signal });
  const data = await response;

  return data;
};

export { getSingleUser, getAllUsers };

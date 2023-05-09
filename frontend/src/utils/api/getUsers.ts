import { API_URL } from '@utils/constants/API_URL';
import { instance } from './instance';

const getAllUsers = async (signal: AbortSignal) => {
  const response = await instance.get(API_URL.USER.GET_ALL_USERS, { signal });
  const data = await response;

  return data;
};

const getSingleUser = async (userId: string) => {
  const { data } = await instance.get(API_URL.USER.GET_SINGLE_USER(userId));
  return data;
};

export { getAllUsers, getSingleUser };

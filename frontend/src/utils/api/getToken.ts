import { API_URL } from '@constants/.';
import { instance } from './instance';

export const getToken = async () => {
  const { data } = await instance.get(API_URL.TOKEN.GET_TOKEN);
  return data;
};

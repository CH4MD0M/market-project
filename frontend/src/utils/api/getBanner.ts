import { API_URL } from '../constants';
import { instance } from './instance';

export const getBanners = async () => {
  const response = await instance.get(API_URL.BANNER.GET_BANNERS);
  return response;
};

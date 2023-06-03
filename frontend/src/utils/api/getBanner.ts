import { API_URL } from '../constants';
import { instance } from './instance';

export const getBanners = async () => {
  try {
    const { data } = await instance.get(API_URL.BANNER.GET_BANNERS);
    return data;
  } catch (error) {
    console.log(error);
  }
};

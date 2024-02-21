import { API_URL } from '@constants/.';
import { instance } from './instance';

export const getSlideImages = async () => {
  const response = await instance.get(API_URL.SLIDE.GET_SLIDE_IMAGES);
  return response;
};

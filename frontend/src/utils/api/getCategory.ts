import { API_URL } from '../constants';
import { instance } from './instance';

const getAllCategories = async () => {
  const response = await instance.get(API_URL.CATEGORY.GET_ALL_CATEGORIES);
  return response;
};

export { getAllCategories };

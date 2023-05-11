import { API_URL } from '../constants';
import { instance } from './instance';

export const postOrder = async (formData: OrderData) => {
  const response = await instance.post(API_URL.ORDER.CREATE_ORDER, formData);
  return response;
};

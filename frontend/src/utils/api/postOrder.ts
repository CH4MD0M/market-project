import { API_URL } from '../constants';
import { instance } from './instance';

const postOrder = async (formData: OrderData) => {
  const response = await instance.post(API_URL.ORDER.CREATE_ORDER, formData);
  return response;
};

const updateOrder = async (orderId: string) => {
  const response = await instance.put(API_URL.ORDER.UPDATE_AS_PAID(orderId));
  return response;
};

export { postOrder, updateOrder };

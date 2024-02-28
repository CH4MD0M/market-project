import { API_URL } from '@constants/.';
import { instance } from './instance';

const getOrdersForAdmin = async () => {
  const response = await instance.get(API_URL.ORDER.ADMIN_GET_ORDERS);
  return response;
};

const getOrdersForUser = async () => {
  const response = await instance.get(API_URL.ORDER.USER_GET_ORDERS);
  return response;
};

const getOrderDetails = async (orderId: string) => {
  const { data } = await instance.get(API_URL.ORDER.GET_ORDER_DETAILS(orderId));

  return data;
};

export { getOrdersForAdmin, getOrdersForUser, getOrderDetails };

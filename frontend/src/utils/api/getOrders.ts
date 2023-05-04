import { API_URL } from '@utils/constants';
import { instance } from './instance';

const getOrdersForAdmin = async () => {
  const response = await instance.get(API_URL.ORDER.ADMIN_GET_ORDERS);
  const data = await response;
  return data;
};

const getOrderDetails = async (orderId: string) => {
  const { data } = await instance.get(API_URL.ORDER.GET_ORDER_DETAILS(orderId));

  return data;
};

export { getOrdersForAdmin, getOrderDetails };

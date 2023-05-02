import { API_URL } from '@utils/constants';
import { getFetchOptions } from '@api/fetchOptions';

const getOrdersForAdmin = async () => {
  const response = await fetch(API_URL.ORDER.ADMIN_GET_ORDERS, getFetchOptions());
  const data = await response.json();

  return data;
};

const getOrderDetails = async (orderId: string) => {
  const response = await fetch(API_URL.ORDER.GET_ORDER_DETAILS(orderId), getFetchOptions());
  const data = await response.json();

  return data;
};
export { getOrdersForAdmin, getOrderDetails };

import { API_URL } from '@utils/constants/API_URL';
import { putFetchOptions } from '@api/fetchOptions';

export const markAsDelivered = async (orderId: string) =>
  fetch(API_URL.ORDER.MARK_AS_DELIVERED(orderId), putFetchOptions());

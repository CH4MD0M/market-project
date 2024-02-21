import { API_URL } from '@constants/.';
import { instance } from './instance';

export const markAsDelivered = async (orderId: string) =>
  instance.put(API_URL.ORDER.MARK_AS_DELIVERED(orderId));

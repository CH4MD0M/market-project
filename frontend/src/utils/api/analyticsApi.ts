import { API_URL } from '../constants';
import { instance } from './instance';

export const getAnalyticsDataByDate = async (date: string, signal: AbortSignal) => {
  const { data } = await instance.get(API_URL.ANALYTICS.GET_ORDER_DATA(date), { signal });

  return data;
};

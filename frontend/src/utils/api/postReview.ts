import { API_URL } from '../constants';
import { instance } from './instance';

export const postReview = async (productId: string, reviewData: any) => {
  const response = await instance.post(API_URL.REVIEW.WRITE_REVIEW(productId), reviewData);
  return response;
};

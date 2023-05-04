import { API_URL } from '@utils/constants/API_URL';
import { instance } from './instance';

export const deleteProduct = (productId: string) =>
  instance.delete(API_URL.PRODUCT.DELETE_PRODUCT(productId));

import { API_URL } from '@utils/constants/API_URL';
import { deleteFetchOptions } from '@api/fetchOptions';

export const deleteProduct = (productId: string) =>
  fetch(API_URL.PRODUCT.DELETE_PRODUCT(productId), deleteFetchOptions());

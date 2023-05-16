import { API_URL } from '@utils/constants';
import { instance } from './instance';

export const deleteProductImage = async (imagePath: string, productId: string) => {
  const encoded = encodeURIComponent(imagePath);
  const response = await instance.delete(API_URL.PRODUCT.DELETE_PRODUCT_IMAGE(encoded, productId));

  return response;
};

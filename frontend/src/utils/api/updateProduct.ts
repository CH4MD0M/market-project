import { API_URL } from '../constants';
import { instance } from './instance';

const updateProduct = async (productId: string, formData: any) => {
  const response = await instance.put(API_URL.PRODUCT.UPDATE_PRODUCT(productId), formData);
  return response;
};

export { updateProduct };

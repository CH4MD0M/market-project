import { API_URL } from '@utils/constants';
import { instance } from './instance';

const uploadProductImage = async (productId: string, formData: any) => {
  const response = await instance.post(API_URL.PRODUCT.UPLOAD_PRODUCT_IMAGE(productId), formData);
  return response;
};

export { uploadProductImage };

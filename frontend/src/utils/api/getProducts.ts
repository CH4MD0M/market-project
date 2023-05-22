import { API_URL } from '@utils/constants';
import { instance } from './instance';

const getAllProducts = async () => {
  const { data } = await instance.get(API_URL.PRODUCT.GET_ALL_PRODUCTS);

  return data;
};

const getSingleProduct = async (productId: string) => {
  const response = await instance.get(API_URL.PRODUCT.GET_SINGLE_PRODUCT(productId));
  return response;
};

export { getAllProducts, getSingleProduct };

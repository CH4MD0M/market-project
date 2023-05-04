import { API_URL } from '@utils/constants';
import { instance } from './instance';

const getProductsForAdmin = async (signal: AbortSignal) => {
  const response = await instance.get(API_URL.PRODUCT.ADMIN_GET_PRODUCTS, {
    signal,
  });
  const data = await response;

  return data;
};

// const getProductsForAdmin = async (abortController: { signal: AbortSignal }) => {
//   const response = await fetch(API_URL.PRODUCT.ADMIN_GET_PRODUCTS, {
//     ...getFetchOptions(),
//     signal: abortController.signal,
//   });
//   const data = await response.json();

//   return data;
// };

export { getProductsForAdmin };

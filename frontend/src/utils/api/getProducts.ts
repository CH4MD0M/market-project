import { API_URL } from '@utils/constants';
import { getFetchOptions } from '@api/fetchOptions';

const getProductsForAdmin = async (abortController: { signal: AbortSignal }) => {
  const response = await fetch(API_URL.PRODUCT.ADMIN_GET_PRODUCTS, {
    ...getFetchOptions(),
    signal: abortController.signal,
  });
  const data = await response.json();

  return data;
};

export { getProductsForAdmin };

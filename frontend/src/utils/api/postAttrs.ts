import { API_URL } from '@utils/constants';
import { instance } from './instance';

const postAttrs = async (attrsData: AttrsData) => {
  const response = await instance.post(API_URL.PRODUCT.SAVE_ATTRIBUTES, attrsData);
  return response;
};

export { postAttrs };

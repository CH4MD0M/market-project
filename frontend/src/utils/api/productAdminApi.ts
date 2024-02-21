import { API_URL } from '@constants/.';
import { instance } from './instance';

// CREATE PRODUCT
const createProduct = async (formData: any) => {
  const repsonse = await instance.post(API_URL.PRODUCT.CREATE_PRODUCT, formData);
  return repsonse;
};

// GET PRODUCTS
const getProductsForAdmin = async (signal: AbortSignal) => {
  const response = await instance.get(API_URL.PRODUCT.ADMIN_GET_PRODUCTS, {
    signal,
  });
  const data = await response;

  return data;
};

// UPDATE PRODUCT
const updateProduct = async (productId: string, formData: any) => {
  const response = await instance.put(API_URL.PRODUCT.UPDATE_PRODUCT(productId), formData);
  return response;
};

// DELETE PRODUCT
const deleteProduct = (productId: string) =>
  instance.delete(API_URL.PRODUCT.DELETE_PRODUCT(productId));

// SAVE ATTRIBUTES
const postAttrs = async (attrsData: AttrsData) => {
  const response = await instance.post(API_URL.PRODUCT.SAVE_ATTRIBUTES, attrsData);
  return response;
};

export { createProduct, getProductsForAdmin, updateProduct, deleteProduct, postAttrs };

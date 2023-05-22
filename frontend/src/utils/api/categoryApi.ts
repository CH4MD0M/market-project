import { API_URL } from '../constants';
import { instance } from './instance';

// For User
const getAllCategories = async () => {
  const response = await instance.get(API_URL.CATEGORY.GET_ALL_CATEGORIES);
  return response;
};

// For Admin
const addNewCategory = async (categoryName: string) => {
  const response = await instance.post(API_URL.CATEGORY.ADD_NEW_CATEGORY, {
    category: categoryName,
  });
  return response;
};

const deleteCategory = async (categoryName: string) => {
  const encodedCategoryName = encodeURIComponent(categoryName);
  const response = instance.delete(API_URL.CATEGORY.DELETE_CATEGORY(encodedCategoryName));
  return response;
};

export { getAllCategories, addNewCategory, deleteCategory };

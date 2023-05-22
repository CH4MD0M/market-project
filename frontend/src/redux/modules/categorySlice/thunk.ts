import { RootState } from '@/redux/store';
import { addNewCategory, deleteCategory, getAllCategories, postAttrs } from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getAllCategoriesThunk = createAsyncThunk('category/getAllCategories', async () => {
  const { data } = await getAllCategories();
  return data;
});

const addNewCategoryThunk = createAsyncThunk<any, string, { state: RootState }>(
  'category/addNewCategory',
  async (category, { getState }) => {
    const prevCategories = getState().category.categories;
    const { data } = await addNewCategory(category);

    if (data.categoryCreated) {
      return [...prevCategories, data.categoryCreated];
    }
  },
);

const deleteCategoryThunk = createAsyncThunk<any, string, { state: RootState }>(
  'category/deleteCategory',
  async (category, { getState }) => {
    const prevCategories = getState().category.categories;
    const filteredCategories = prevCategories.filter((cat: any) => cat.name !== category);
    const { data } = await deleteCategory(category);

    if (data.categoryDeleted) {
      return filteredCategories;
    }
  },
);

const saveAttributeThunk = createAsyncThunk<any, AttrsData, { state: RootState }>(
  'category/saveAttribute',
  async (payload, { getState }) => {
    const selectedCategory = getState().category.selectedCategory;
    const { data } = await postAttrs({ ...payload, selectedCategory });

    return data;
  },
);

export { getAllCategoriesThunk, saveAttributeThunk, addNewCategoryThunk, deleteCategoryThunk };

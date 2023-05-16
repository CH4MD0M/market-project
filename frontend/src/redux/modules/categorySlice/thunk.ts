import { getAllCategories, postAttrs } from '@/utils/api';
import { createAsyncThunk } from '@reduxjs/toolkit';

const getAllCategoriesThunk = createAsyncThunk('category/getAllCategories', async () => {
  const { data } = await getAllCategories();
  return data;
});

const saveAttributeThunk = createAsyncThunk(
  'category/saveAttribute',
  async (attrsData: AttrsData) => {
    const { data } = await postAttrs(attrsData);
    return data;
  },
);

export { getAllCategoriesThunk, saveAttributeThunk };

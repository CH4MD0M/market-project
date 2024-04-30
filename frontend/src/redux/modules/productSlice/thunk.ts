import { createAsyncThunk } from '@reduxjs/toolkit';

import { setSelectedCategory } from '../categorySlice';
import { getSingleProduct } from '@utils/api';

export const getSingleProductThunk = createAsyncThunk(
  'product/getSingleProduct',
  async (id: string, { dispatch, rejectWithValue }) => {
    try {
      const response = await getSingleProduct(id);
      const { category } = response.data;
      dispatch(setSelectedCategory(category));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response.data.message);
    }
  },
);

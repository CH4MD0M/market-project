import { createSlice } from '@reduxjs/toolkit';
import { getAllCategoriesThunk, saveAttributeThunk } from './thunk';
import { CatState } from './types';

const initialState = {
  categories: [],
} as CatState;

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    saveAttrs(state, action) {
      state.categories = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
      state.categories = action.payload;
    });

    builder.addCase(saveAttributeThunk.fulfilled, (state, action) => {
      const { categoryUpdated } = action.payload;
      state.categories = categoryUpdated;
    });
  },
});

export const {} = categorySlice.actions;

export default categorySlice.reducer;

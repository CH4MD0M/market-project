import { createSlice } from '@reduxjs/toolkit';
import {
  addNewCategoryThunk,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  saveAttributeThunk,
} from './thunk';
import { CatState } from './types';

const initialState: CatState = {
  categories: [],
  selectedCategory: 'Choose category',
  catLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    resetCategoryState: state => {
      state.selectedCategory = 'Choose category';
    },
  },
  extraReducers: builder => {
    builder.addCase(getAllCategoriesThunk.pending, state => {
      state.catLoading = true;
    });
    builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
      state.catLoading = false;
      state.categories = action.payload;
    });

    builder.addCase(saveAttributeThunk.fulfilled, (state, action) => {
      const { categoriesUpdated } = action.payload;
      state.categories = categoriesUpdated;
    });

    builder.addCase(addNewCategoryThunk.fulfilled, (state, action) => {
      const updatedCategory = action.payload;
      state.categories = updatedCategory;
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      const updatedCategory = action.payload;
      state.categories = updatedCategory;
      state.selectedCategory = 'Choose category';
    });
  },
});

export const { setSelectedCategory, resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;

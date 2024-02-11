import { createSlice } from '@reduxjs/toolkit';
import {
  addNewCategoryThunk,
  deleteCategoryThunk,
  getAllCategoriesThunk,
  saveAttributeThunk,
} from './thunk';
import { CategoryState } from './types';

const initialState: CategoryState = {
  categoryDataList: [],
  selectedCategory: '',
  categoryLoading: false,
};

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    resetCategoryState: state => {
      state.selectedCategory = '';
    },
  },
  extraReducers: builder => {
    // Get All Categories
    builder.addCase(getAllCategoriesThunk.pending, state => {
      state.categoryLoading = true;
    });
    builder.addCase(getAllCategoriesThunk.fulfilled, (state, action) => {
      state.categoryLoading = false;
      state.categoryDataList = action.payload;
    });

    // Save New Attribute
    builder.addCase(saveAttributeThunk.fulfilled, (state, action) => {
      // updatedCategory => after adding new attribute
      const { updatedCategories } = action.payload;
      state.categoryDataList = updatedCategories;
    });

    builder.addCase(addNewCategoryThunk.fulfilled, (state, action) => {
      // updatedCategory => after adding new category
      const updatedCategory = action.payload;
      state.categoryDataList = updatedCategory;
    });

    builder.addCase(deleteCategoryThunk.fulfilled, (state, action) => {
      // updatedCategory => after deleting category
      const updatedCategory = action.payload;
      state.categoryDataList = updatedCategory;
      state.selectedCategory = '';
    });
  },
});

export const { setSelectedCategory, resetCategoryState } = categorySlice.actions;

export default categorySlice.reducer;

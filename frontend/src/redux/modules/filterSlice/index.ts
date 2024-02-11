import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  sortOption: '',
  priceFilter: { minPrice: 0, maxPrice: 0 },
  ratingFilter: 0,
  categoryFilter: '',
  attrsFilter: [],
  attrsData: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setPriceFilter: (state, action: PayloadAction<{ minPrice: number; maxPrice: number }>) => {
      const { minPrice, maxPrice } = action.payload;
      state.priceFilter = { minPrice, maxPrice };
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },
    setCategoryFilter: (
      state,
      action: PayloadAction<{ selectedCategory: string; categoryDataList: Category[] }>,
    ) => {
      const { selectedCategory, categoryDataList } = action.payload;
      state.categoryFilter = selectedCategory;

      const matchCategory = categoryDataList.find(category => category.name === selectedCategory);
      if (matchCategory) state.attrsData = matchCategory.attrs;
    },
    setAttrsFilter: (state, action) => {
      state.attrsFilter = action.payload;
    },
    resetCategoryFilter: state => {
      state.categoryFilter = '';
      state.attrsData = [];
      state.attrsFilter = [];
    },
    resetFilter: state => {
      state.sortOption = '';
      state.priceFilter = { minPrice: 0, maxPrice: 0 };
      state.ratingFilter = 0;
      state.attrsFilter = [];
    },
  },
});

export const {
  setSortOption,
  setPriceFilter,
  setRatingFilter,
  setCategoryFilter,
  setAttrsFilter,
  resetCategoryFilter,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

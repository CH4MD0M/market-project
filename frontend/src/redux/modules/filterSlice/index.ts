import { createSlice } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  attrsFromCategory: [],
  sortOption: '',
  categoryFilter: {},
  attrsFilter: [],
  priceFilter: 0,
  ratingFilter: {},
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setAttrsFromCategory: (state, action) => {
      state.attrsFromCategory = action.payload;
    },

    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setCategoryFilter: (state, action) => {
      state.categoryFilter = action.payload;
    },
    setAttrsFilter: (state, action) => {
      state.attrsFilter = action.payload;
    },
    setPriceFilter: (state, action) => {
      state.priceFilter = action.payload;
    },
    setRatingFilter: (state, action) => {
      state.ratingFilter = action.payload;
    },

    resetFilter: () => {
      return initialState;
    },
  },
});

export const {
  setAttrsFromCategory,
  setSortOption,
  setCategoryFilter,
  setAttrsFilter,
  setPriceFilter,
  setRatingFilter,
  resetFilter,
} = filterSlice.actions;

export default filterSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';
import { FilterState } from './types';

const initialState: FilterState = {
  filters: {
    price: 0,
    rating: {},
    category: {},
    attrs: [],
  },
  attrsFilter: [],
  attrsFromFilter: [],
  priceFromFilter: 0,
  ratingsFromFilter: {},
  categoriesFromFilter: {},
  sortOption: '',
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilters(state, action) {
      state.filters = action.payload;
    },

    setAttrsFilter(state, action) {
      state.attrsFilter = action.payload;
    },

    setAttrsFromFilter(state, action) {
      state.attrsFromFilter = action.payload;
    },

    setPriceFromFilter(state, action) {
      state.priceFromFilter = action.payload;
    },

    setRatingsFromFilter(state, action) {
      state.ratingsFromFilter = action.payload;
    },

    setCategoriesFromFilter(state, action) {
      state.categoriesFromFilter = action.payload;
    },

    setSortOption(state, action) {
      state.sortOption = action.payload;
    },
  },
});

export const {
  setFilters,
  setAttrsFilter,
  setAttrsFromFilter,
  setPriceFromFilter,
  setRatingsFromFilter,
  setCategoriesFromFilter,
  setSortOption,
} = filterSlice.actions;

export default filterSlice.reducer;

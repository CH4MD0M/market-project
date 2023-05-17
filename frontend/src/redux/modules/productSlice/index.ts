import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './types';

const initialState = {
  attributesFromDb: [],
  attributesTable: [],
  categoryChoosen: 'Choose category',
  imageRemoved: false,
} as ProductState;

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setAttributesFromDb: (state, action) => {
      state.attributesFromDb = action.payload;
    },
    setAttributesTable: (state, action) => {
      state.attributesTable = action.payload;
    },
    setCategoryChoosen: (state, action) => {
      state.categoryChoosen = action.payload;
    },
    setImageRemoved: (state, action) => {
      state.imageRemoved = action.payload;
    },
    resetAttributesTable: () => {
      return initialState;
    },
  },
});

export const {
  setAttributesFromDb,
  setAttributesTable,
  setCategoryChoosen,
  setImageRemoved,
  resetAttributesTable,
} = productSlice.actions;

export default productSlice.reducer;

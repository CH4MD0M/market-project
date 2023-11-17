import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './types';

const initialState: ProductState = {
  attributesFromDb: [],
  attributesTable: [],
  uploadedImageData: [],
  imageUpdated: false,
  imageRemoved: false,
};

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
    // For Create Product Page
    setImageDataAfterUploaded: (state, action) => {
      state.uploadedImageData = action.payload;
    },
    setImageDataAfterDeleted: (state, action) => {
      state.uploadedImageData = action.payload;
    },
    // For Edit Product Page
    setImageUpdated: (state, action) => {
      state.imageUpdated = action.payload;
    },
    setImageRemoved: (state, action) => {
      state.imageRemoved = action.payload;
    },

    // Reset Product State
    resetProductState: () => {
      return initialState;
    },
  },
});

export const {
  setAttributesFromDb,
  setAttributesTable,
  setImageDataAfterUploaded,
  setImageDataAfterDeleted,
  setImageUpdated,
  setImageRemoved,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;

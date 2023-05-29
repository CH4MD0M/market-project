import { createSlice } from '@reduxjs/toolkit';
import { ProductState } from './types';

const initialState: ProductState = {
  attributesFromDb: [],
  attributesTable: [],
  uploadedImageData: [],
  imageUpdated: false,
  imageRemoved: false,
  pageNum: 1,
  maxPageNum: 0,
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
    setPageNum: (state, action) => {
      state.pageNum = action.payload;
    },
    setMaxPageNum: (state, action) => {
      state.maxPageNum = action.payload;
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
  setPageNum,
  setMaxPageNum,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;

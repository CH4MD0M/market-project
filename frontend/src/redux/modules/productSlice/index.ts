import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductState } from './types';
import { getSingleProductThunk } from './thunk';

const initialState: ProductState = {
  productData: null,
  categoryAttributes: [],
  selectedAttributes: [],
  stagedImageFiles: [],
  imageFilesToDelete: [],
  isEditMode: false,
  productFormInputs: {
    name: '',
    count: '',
    price: '',
    description: '',
  },
  errorMessage: '',
};

const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    setProductData: (state, action) => {
      state.productData = action.payload;
    },
    setCategoryAttributes: (state, action) => {
      state.categoryAttributes = action.payload;
    },
    setSelectedAttributes: (state, action) => {
      state.selectedAttributes = action.payload;
    },

    // Set Local Image Preview before upload
    setStagedImageFiles: (state, action) => {
      state.stagedImageFiles = action.payload;
    },

    // Set Image Files to Delete
    setImageFilesToDelete: (state, action) => {
      state.imageFilesToDelete.push(action.payload);
    },

    // Delete Server Image Preview before upload
    deleteServerPreviewImage: (state, action) => {
      if (state.productData) {
        state.productData.images = state.productData!.images.filter(
          image => image._id !== action.payload,
        );
      }
    },

    setEditMode: (state, action) => {
      state.isEditMode = action.payload;
    },

    setProductFormInput: (
      state,
      action: PayloadAction<{ field: keyof ProductFormInputType; value: string }>,
    ) => {
      const { field, value } = action.payload;
      state.productFormInputs[field] = value;
    },

    // Reset Product State
    resetProductState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(getSingleProductThunk.fulfilled, (state, action) => {
      const { attrs } = action.payload;
      state.productData = action.payload;
      state.selectedAttributes = attrs;
    });
    builder.addCase(getSingleProductThunk.rejected, (state, action) => {
      if (action.error) {
        state.errorMessage = action.error.message;
      }
    });
  },
});

export const {
  setProductData,
  setCategoryAttributes,
  setSelectedAttributes,
  setStagedImageFiles,
  setImageFilesToDelete,
  deleteServerPreviewImage,
  setEditMode,
  setProductFormInput,
  resetProductState,
} = productSlice.actions;

export default productSlice.reducer;

import { updateUser } from '@/utils/api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

interface userState {
  address: string;
  zipCode: string;
  loading: boolean;
  error: boolean;
  isUpdate: boolean;
}

const initialState = {
  address: '',
  zipCode: '',
  loading: false,
  error: false,
  isUpdate: false,
} as userState;

export const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formData: UserProfileFormData) => {
    const response = await updateUser(formData);
    return response;
  },
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress(state, action) {
      const { address, zipCode } = action.payload;
      state.address = address;
      state.zipCode = zipCode;
    },
  },
  extraReducers: builder => {
    // update user profile
    builder.addCase(updateUserProfile.pending, state => {
      state.loading = true;
    });
    builder.addCase(updateUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.isUpdate = true;
      state.error = false;
    });
    builder.addCase(updateUserProfile.rejected, state => {
      state.loading = false;
      state.isUpdate = false;
      state.error = true;
    });
  },
});

export const { setAddress } = userSlice.actions;
export default userSlice.reducer;

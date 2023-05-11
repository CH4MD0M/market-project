import { createSlice } from '@reduxjs/toolkit';
import { updateUserProfile } from './thunk';
import { UserState } from './types';

const initialState = {
  userAddress: {},
  loading: false,
  error: false,
  isUpdate: false,
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAddress(state, action) {
      const { address, zipCode } = action.payload;
      state.userAddress.address = address;
      state.userAddress.zipCode = zipCode;
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

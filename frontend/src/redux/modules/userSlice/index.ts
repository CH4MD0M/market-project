import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import { updateUserNameThunk } from './thunk';
import { isFulfilledAction, isPendingAction } from './util';
import { StorageType, getValue } from '@utils/storageUtils';

const initialState = {
  userData: getValue(StorageType.LOCAL, 'userInfo') || getValue(StorageType.SESSION, 'userInfo'),
  userAddress: {},
  loading: false,
  error: false,
  isUpdate: false,
  role: '',
} as UserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserRole(state, action) {
      const { isAdmin } = action.payload;
      state.role = isAdmin ? 'admin' : 'user';
    },
    setUserInfo(state, action) {
      const { userInfo } = action.payload;
      state.userData = userInfo;
    },
    setAddress(state, action) {
      const { newAddress, newZipCode } = action.payload;
      state.userAddress.address = newAddress;
      state.userAddress.zipCode = newZipCode;
    },
    resetUpdateSatatus(state) {
      state.isUpdate = false;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserNameThunk.fulfilled, (state, action) => {
      state.isUpdate = true;
      const { userUpdated } = action.payload;
      state.userData = userUpdated;
    });
    builder.addMatcher(isPendingAction, state => {
      state.loading = true;
    });
    builder.addMatcher(isFulfilledAction, (state, action) => {
      state.isUpdate = true;
      state.loading = false;
    });
  },
});

export const { setUserInfo, setUserRole, setAddress, resetUpdateSatatus } = userSlice.actions;
export default userSlice.reducer;

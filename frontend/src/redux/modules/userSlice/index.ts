import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import { updateUserNameThunk } from './thunk';
import { isFulfilledAction, isPendingAction } from './util';
import { StorageType, getValue } from '@utils/storageUtils';

const initialState: UserState = {
  userData: getValue(StorageType.LOCAL, 'userInfo') || getValue(StorageType.SESSION, 'userInfo'),
  userAddress: {},
  loading: false,
  error: false,
  isUpdate: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userData = action.payload;
    },
    setAddress: (state, action) => {
      const { newAddress, newZipCode } = action.payload;
      state.userAddress.address = newAddress;
      state.userAddress.zipCode = newZipCode;
    },
    resetUpdateSatatus: state => {
      state.isUpdate = false;
    },
    resetUserState: () => {
      return { ...initialState, userData: null };
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
    builder.addMatcher(isFulfilledAction, state => {
      state.isUpdate = true;
      state.loading = false;
    });
  },
});

export const { setUserInfo, setAddress, resetUpdateSatatus, resetUserState } = userSlice.actions;
export default userSlice.reducer;

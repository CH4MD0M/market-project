import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
import { updateUserAddressThunk, updateUserNameThunk, updateUserPhoneThunk } from './thunk';
import { isFulfilledAction, isPendingAction } from './util';
import { StorageType, getValue } from '@utils/storageUtils';

const initialState: UserState = {
  userData: getValue(StorageType.LOCAL, 'userInfo') || getValue(StorageType.SESSION, 'userInfo'),
  userProfileInfo: {},
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
    setUserProfileInfo: (state, action) => {
      state.userProfileInfo = action.payload;
    },
    resetUpdateSatatus: state => {
      state.isUpdate = false;
    },
    resetUserState: () => {
      return initialState;
    },
  },
  extraReducers: builder => {
    builder.addCase(updateUserNameThunk.fulfilled, (state, action) => {
      const { userUpdated } = action.payload;
      state.userData = userUpdated;
    });
    builder.addCase(updateUserPhoneThunk.fulfilled, (state, action) => {
      const { userUpdated } = action.payload;
      state.userProfileInfo.phoneNumber = userUpdated.phoneNumber;
    });
    builder.addCase(updateUserAddressThunk.fulfilled, (state, action) => {
      const { userUpdated } = action.payload;
      state.userProfileInfo.address = userUpdated.address;
      state.userProfileInfo.zipCode = userUpdated.zipCode;
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

export const { setUserInfo, setUserProfileInfo, resetUpdateSatatus, resetUserState } =
  userSlice.actions;
export default userSlice.reducer;

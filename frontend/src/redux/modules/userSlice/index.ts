import { createSlice } from '@reduxjs/toolkit';

import { UserState } from './types';
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
      const { address, zipCode } = action.payload;
      state.userAddress.address = address;
      state.userAddress.zipCode = zipCode;
    },
  },
  extraReducers: builder => {},
});

export const { setUserInfo, setUserRole, setAddress } = userSlice.actions;
export default userSlice.reducer;

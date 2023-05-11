import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { login, loginCheck, logout, signup } from './thunk';
import { StorageType, getValue } from '@utils/storageUtils';

const initialState = {
  user: getValue(StorageType.LOCAL, 'userInfo') || getValue(StorageType.SESSION, 'userInfo'),
  loading: false,
  error: false,
  isLogin: false,
  role: '',
} as AuthState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, (state, action) => {
      const { userInfo } = action.payload.data;
      state.loading = false;
      state.user = userInfo;
      state.role = userInfo.isAdmin ? 'admin' : 'user';
      state.isLogin = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    // loginCheck
    builder.addCase(loginCheck.fulfilled, (state, action) => {
      const { isAdmin } = action.payload;

      state.isLogin = true;
      state.role = isAdmin ? 'admin' : 'user';
    });

    // logout
    builder.addCase(logout.fulfilled, state => {
      state.isLogin = false;
      state.role = '';
      state.user = null;
    });

    // signup
    builder.addCase(signup.pending, state => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, (state, action) => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default authSlice.reducer;

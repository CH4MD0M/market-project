import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { login, loginCheck, logout, signup } from './thunk';

const initialState: AuthState = {
  loading: false,
  authCheckLoading: true,
  error: false,
  isLogin: localStorage.getItem('userInfo') || sessionStorage.getItem('userInfo') ? true : false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthCheckLoading: (state, action) => {
      state.authCheckLoading = action.payload;
    },
  },
  extraReducers: builder => {
    // login
    builder.addCase(login.pending, state => {
      state.loading = true;
    });
    builder.addCase(login.fulfilled, state => {
      state.loading = false;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    // loginCheck
    builder.addCase(loginCheck.fulfilled, state => {
      state.isLogin = true;
      state.authCheckLoading = false;
    });
    builder.addCase(loginCheck.rejected, state => {
      state.isLogin = false;
      state.authCheckLoading = false;
    });

    // logout
    builder.addCase(logout.fulfilled, state => {
      state.isLogin = false;
    });

    // signup
    builder.addCase(signup.pending, state => {
      state.loading = true;
    });
    builder.addCase(signup.fulfilled, state => {
      state.loading = false;
    });
    builder.addCase(signup.rejected, state => {
      state.loading = false;
      state.error = true;
    });
  },
});

export default authSlice.reducer;
export const { setAuthCheckLoading } = authSlice.actions;

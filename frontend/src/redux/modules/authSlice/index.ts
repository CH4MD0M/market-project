import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from './types';
import { login, loginCheck, logout, signup } from './thunk';

const initialState = {
  loading: false,
  error: false,
  isLogin: false,
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
    builder.addCase(login.fulfilled, state => {
      state.loading = false;
      state.isLogin = true;
    });
    builder.addCase(login.rejected, state => {
      state.loading = false;
      state.error = true;
    });

    // loginCheck
    builder.addCase(loginCheck.pending, state => {
      state.loading = true;
    });
    builder.addCase(loginCheck.fulfilled, state => {
      state.isLogin = true;
      state.loading = false;
    });
    builder.addCase(loginCheck.rejected, state => {
      state.isLogin = false;
      state.loading = false;
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

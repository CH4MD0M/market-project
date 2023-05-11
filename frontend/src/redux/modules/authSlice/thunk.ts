import { createAsyncThunk } from '@reduxjs/toolkit';

import { postSignIn, postSignOut, getToken } from '@utils/api';
import { postSignUp } from '@utils/api';
import { StorageType, getValue, removeValue } from '@utils/storageUtils';

// loginCheck
export const loginCheck = createAsyncThunk('auth/loginCheck', async () => {
  const { data } = await getToken();
  return data;
});

// login
export const login = createAsyncThunk('auth/login', async (formData: LoginFormData) => {
  const response = await postSignIn(formData);
  return response;
});

// logout
export const logout = createAsyncThunk('auth/logout', async () => {
  await postSignOut();
  removeValue(StorageType.LOCAL, 'userInfo');
  removeValue(StorageType.SESSION, 'userInfo');
  removeValue(StorageType.LOCAL, 'cartItems');
});

// signup
export const signup = createAsyncThunk('auth/signup', async (formData: SignupFormData) => {
  const response = await postSignUp(formData);
  return response;
});

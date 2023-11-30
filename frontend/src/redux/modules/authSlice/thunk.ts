import { createAsyncThunk } from '@reduxjs/toolkit';

import { setUserInfo, resetUserState } from '../userSlice';
import { postSignIn, postSignOut, getToken } from '@utils/api';
import { postSignUp } from '@utils/api';
import { StorageType, removeValue } from '@utils/storageUtils';
import { storeUserInfo } from '@utils/storeUserInfo';

// loginCheck
export const loginCheck = createAsyncThunk('auth/loginCheck', async (_, { dispatch }) => {
  const { userInfo } = await getToken();

  dispatch(setUserInfo(userInfo));
  storeUserInfo(userInfo.doNotLogout, userInfo);
  return userInfo;
});

// signup
export const signup = createAsyncThunk('auth/signup', async (formData: SignupFormData) => {
  const response = await postSignUp(formData);
  return response;
});

// login
export const login = createAsyncThunk(
  'auth/login',
  async (formData: LoginFormData, { dispatch }) => {
    const { data } = await postSignIn(formData);
    dispatch(setUserInfo(data.userInfo));
    return data;
  },
);

// logout
export const logout = createAsyncThunk('auth/logout', async (_, { dispatch }) => {
  const response = await postSignOut();
  removeValue(StorageType.LOCAL, 'userInfo');
  removeValue(StorageType.SESSION, 'userInfo');
  removeValue(StorageType.LOCAL, 'cartItems');
  dispatch(resetUserState());
  return response;
});

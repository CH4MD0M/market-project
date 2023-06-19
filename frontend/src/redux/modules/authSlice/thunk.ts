import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';
import { setUserInfo, setUserRole } from '../userSlice';
import { postSignIn, postSignOut, getToken } from '@utils/api';
import { postSignUp } from '@utils/api';
import { StorageType, removeValue } from '@utils/storageUtils';

// loginCheck
export const loginCheck = createAsyncThunk<any, void, { state: RootState }>(
  'auth/loginCheck',
  async (_, { dispatch }) => {
    const { data } = await getToken();

    dispatch(setUserRole(data));
    dispatch(setUserInfo(data));

    return data;
  },
);

// login
export const login = createAsyncThunk(
  'auth/login',
  async (formData: LoginFormData, { dispatch }) => {
    const response = await postSignIn(formData);

    dispatch(setUserInfo(response.data));
    dispatch(setUserRole(response.data.userInfo));

    return response;
  },
);

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

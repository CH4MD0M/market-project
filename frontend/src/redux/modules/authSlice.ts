import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { StorageType, getValue, removeValue } from '@utils/storageUtils';

import { postSignIn, postSignOut, getToken } from '@utils/api';
import { postSignUp } from '@/utils/api';

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

interface AuthState {
  user: UserInfo | null;
  loading: boolean;
  error: boolean;
  isLogin: boolean;
  role: string;
}

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
      const { token } = action.payload;

      if (token) {
        state.isLogin = true;
        state.role = token;
      }
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

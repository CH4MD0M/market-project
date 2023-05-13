import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  getSingleUser,
  updateUserAddress,
  updateUserName,
  updateUserPassword,
  updateUserPhone,
} from '@utils/api';

const updateUserNameThunk = createAsyncThunk(
  'user/updateUserName',
  async (formData: UpdateUserNameFormData) => {
    const response = await updateUserName(formData);
    return response;
  },
);

const updateUserPhoneThunk = createAsyncThunk(
  'user/updateUserPhone',
  async (formData: UpdateUserPhoneFormData) => {
    const response = await updateUserPhone(formData);
    return response;
  },
);

const updateUserAddressThunk = createAsyncThunk(
  'user/updateUserAddress',
  async (formData: UpdateUserAddressFormData) => {
    const response = await updateUserAddress(formData);
    return response;
  },
);

const updateUserPasswordThunk = createAsyncThunk(
  'user/updateUserPassword',
  async (password: UpdateUserPasswordFormData) => {
    const response = await updateUserPassword(password);
    return response;
  },
);

const getUserAddress = createAsyncThunk('user/getUserAddress', async (userId: string) => {
  const response = getSingleUser(userId);
  return response;
});

export {
  updateUserNameThunk,
  updateUserAddressThunk,
  updateUserPhoneThunk,
  updateUserPasswordThunk,
  getUserAddress,
};

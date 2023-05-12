import { createAsyncThunk } from '@reduxjs/toolkit';
import { getSingleUser, updateUserAddress, updateUserPassword, updateUserPhone } from '@utils/api';

const updateUserPhoneThunk = createAsyncThunk(
  'user/updateUserPhone',
  async (phoneNumber: string) => {
    const response = await updateUserPhone(phoneNumber);
    return response;
  },
);

const updateUserAddressThunk = createAsyncThunk('user/updateUserAddress', async (formData: any) => {
  const response = await updateUserAddress(formData);
  return response;
});

const updateUserPasswordThunk = createAsyncThunk(
  'user/updateUserPassword',
  async (password: string) => {
    const response = await updateUserPassword(password);
    return response;
  },
);

const getUserAddress = createAsyncThunk('user/getUserAddress', async (userId: string) => {
  const response = getSingleUser(userId);
  return response;
});

export { updateUserAddressThunk, updateUserPhoneThunk, updateUserPasswordThunk, getUserAddress };

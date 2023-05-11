import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUser, getSingleUser } from '@utils/api';

const updateUserProfile = createAsyncThunk(
  'user/updateUserProfile',
  async (formData: UserProfileFormData) => {
    const response = await updateUser(formData);
    return response;
  },
);

const getUserAddress = createAsyncThunk('user/getUserAddress', async (userId: string) => {
  const response = getSingleUser(userId);
  return response;
});

export { updateUserProfile, getUserAddress };

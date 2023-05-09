import { API_URL } from '../constants';
import { instance } from './instance';

export const updateUser = async (formData: UserProfileFormData) => {
  const response = await instance.put(API_URL.USER.UPDATE_USER, formData);
  return response;
};

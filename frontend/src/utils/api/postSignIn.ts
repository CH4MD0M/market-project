import { API_URL } from '@constants/.';
import { instance } from './instance';

export const postSignIn = async (formData: LoginFormData) => {
  const response = await instance.post(API_URL.USER.LOGIN, formData);

  return response;
};

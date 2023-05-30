import { API_URL } from '@utils/constants';
import { instance } from './instance';

export const postSignUp = async (formData: SignupFormData) => {
  const response = await instance.post(API_URL.USER.SIGNUP, formData);

  return response;
};

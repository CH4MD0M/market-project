import { API_URL } from '../constants';
import { instance } from './instance';

const updateUserName = async (formData: UpdateUserNameFormData) => {
  const { data } = await instance.put(API_URL.USER.UPDATE_USER_NAME, formData);
  return data;
};

const updateUserAddress = async (formData: UserAddressInfo) => {
  const { data } = await instance.put(API_URL.USER.UPDATE_USER_ADDRESS, formData);
  return data;
};

const updateUserPhone = async (phoneNumber: UpdateUserPhoneFormData) => {
  const { data } = await instance.put(API_URL.USER.UPDATE_USER_PHONE, phoneNumber);
  return data;
};

const updateUserPassword = async (password: UpdateUserPasswordFormData) => {
  const response = await instance.put(API_URL.USER.UPDATE_USER_PASSWORD, password);
  return response;
};

export { updateUserName, updateUserAddress, updateUserPhone, updateUserPassword };

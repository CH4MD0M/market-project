import { API_URL } from '@utils/constants';
import { instance } from '@api/instance';

const editUser = (userId: string, formData: EditUserFormData) => {
  const response = instance.put(API_URL.USER.EDIT_USER(userId), formData);

  return response;
};
const deleteUser = (userId: string) => instance.delete(API_URL.USER.DELETE_USER(userId));

export { editUser, deleteUser };

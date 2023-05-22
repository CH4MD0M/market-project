import { API_URL } from '@utils/constants/API_URL';
import { instance } from '@api/instance';

export const deleteUser = (userId: string) => instance.delete(API_URL.USER.DELETE_USER(userId));

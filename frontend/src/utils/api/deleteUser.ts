import { API_URL } from '@utils/constants/API_URL';
import { deleteFetchOptions } from '@api/fetchOptions';

export const deleteUser = (userId: string) =>
  fetch(API_URL.USER.DELETE_USER(userId), deleteFetchOptions());

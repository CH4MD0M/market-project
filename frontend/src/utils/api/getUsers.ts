import { API_URL } from '@utils/constants/API_URL';
import { getFetchOptions } from '@api/fetchOptions';

export const getAllUsers = async (abortController: { signal: AbortSignal }) => {
  const response = await fetch(API_URL.USER.GET_ALL_USERS, {
    ...getFetchOptions(),
    signal: abortController.signal,
  });
  const data = await response.json();

  return data;
};

import { API_URL } from '@utils/constants/API_URL';
import { instance } from './instance';

export const getAllUsers = async (abortController: { signal: AbortSignal }) => {
  const response = await instance.get(API_URL.USER.GET_ALL_USERS);
  const data = await response;

  return data;
};

// export const getAllUsers = async (abortController: { signal: AbortSignal }) => {
//   const response = await fetch(API_URL.USER.GET_ALL_USERS, {
//     ...getFetchOptions(),
//     signal: abortController.signal,
//   });
//   const data = await response.json();

//   return data;
// };

import { AsyncThunk } from '@reduxjs/toolkit';

export interface UserState {
  userData: UserData;
  userProfileInfo: UserProfileInfo;
  loading: boolean;
  error: boolean;
  isUpdate: boolean;
}
interface UserProfileInfo {
  address?: string;
  zipCode?: string;
  phoneNumber?: string;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

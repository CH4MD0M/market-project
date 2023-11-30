import { AsyncThunk } from '@reduxjs/toolkit';

export interface UserState {
  userData: UserData;
  userAddress: UserAddressInfo;
  loading: boolean;
  error: boolean;
  isUpdate: boolean;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
// type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

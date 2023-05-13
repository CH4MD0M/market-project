import { AsyncThunk } from '@reduxjs/toolkit';

export interface UserState {
  userData: any;
  userAddress: UserAddressInfo;
  loading: boolean;
  error: boolean;
  isUpdate: boolean;
  role: string;
}

type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;
// type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;

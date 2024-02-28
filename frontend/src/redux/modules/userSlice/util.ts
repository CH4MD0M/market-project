import { AnyAction } from '@reduxjs/toolkit';
import { FulfilledAction, PendingAction } from './types';

import {
  updateUserAddressThunk,
  updateUserNameThunk,
  updateUserPasswordThunk,
  updateUserPhoneThunk,
} from './thunk';

function isPendingAction(action: AnyAction): action is PendingAction {
  return [
    updateUserNameThunk.pending,
    updateUserPhoneThunk.pending,
    updateUserAddressThunk.pending,
    updateUserPasswordThunk.pending,
  ].some(pending => action.type === pending.type);
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return [
    updateUserNameThunk.fulfilled,
    updateUserPhoneThunk.fulfilled,
    updateUserAddressThunk.fulfilled,
    updateUserPasswordThunk.fulfilled,
  ].some(fulfilled => action.type === fulfilled.type);
}

export { isPendingAction, isFulfilledAction };

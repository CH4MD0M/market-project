import { AnyAction } from '@reduxjs/toolkit';
import { FulfilledAction, PendingAction } from './types';

import { updateUserAddressThunk, updateUserPasswordThunk, updateUserPhoneThunk } from './thunk';

function isPendingAction(action: AnyAction): action is PendingAction {
  return [
    updateUserPhoneThunk.pending,
    updateUserAddressThunk.pending,
    updateUserPasswordThunk.pending,
  ].some(pending => action.type === pending.type);
}

function isFulfilledAction(action: AnyAction): action is FulfilledAction {
  return [
    updateUserPhoneThunk.fulfilled,
    updateUserAddressThunk.fulfilled,
    updateUserPasswordThunk.fulfilled,
  ].some(fulfilled => action.type === fulfilled.type);
}

export { isPendingAction, isFulfilledAction };

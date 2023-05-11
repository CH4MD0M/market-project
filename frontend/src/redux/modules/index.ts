import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  cart: cartSlice,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import categorySlice from './categorySlice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  cart: cartSlice,
  category: categorySlice,
});

export default rootReducer;

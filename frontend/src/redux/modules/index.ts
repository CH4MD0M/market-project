import { combineReducers } from '@reduxjs/toolkit';

import authSlice from './authSlice';
import userSlice from './userSlice';
import cartSlice from './cartSlice';
import categorySlice from './categorySlice';
import productSlice from './productSlice';
import filterSlice from './filterSlice';

const rootReducer = combineReducers({
  auth: authSlice,
  user: userSlice,
  cart: cartSlice,
  category: categorySlice,
  product: productSlice,
  filter: filterSlice,
});

export default rootReducer;

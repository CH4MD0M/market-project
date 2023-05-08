import { combineReducers } from '@reduxjs/toolkit';
import layoutSlice from './layoutSlice';
import authSlice from './authSlice';

const rootReducer = combineReducers({
  layout: layoutSlice,
  auth: authSlice,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import layoutSlice from './layoutSlice';
import authSlice from './authSlice';
import userSlice from './userSlice';

const rootReducer = combineReducers({
  layout: layoutSlice,
  auth: authSlice,
  user: userSlice,
});

export default rootReducer;

import { combineReducers } from '@reduxjs/toolkit';
import layoutSlice from './layoutSlice';

const rootReducer = combineReducers({
  layout: layoutSlice,
});

export default rootReducer;

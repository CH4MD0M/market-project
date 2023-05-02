import { MiddlewareArray, configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './modules';

export const store = configureStore({
  reducer: rootReducer,
  middleware: new MiddlewareArray().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

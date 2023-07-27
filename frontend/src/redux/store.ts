import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './modules';
import { cartListenerMiddleware } from './modules/cartSlice/middleware';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({ serializableCheck: false }).concat(
      cartListenerMiddleware.middleware,
    );

    if (process.env.NODE_ENV === 'development') {
      middlewares.push(logger);
    }

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

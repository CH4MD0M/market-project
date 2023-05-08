import { configureStore } from '@reduxjs/toolkit';
import logger from 'redux-logger';

import rootReducer from './modules';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware => {
    const middlewares = getDefaultMiddleware({ serializableCheck: false });

    if (process.env.NODE_ENV === 'development') {
      middlewares.concat(logger);
    }

    return middlewares;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

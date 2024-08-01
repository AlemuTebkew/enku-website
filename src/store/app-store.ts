import { configureStore } from '@reduxjs/toolkit';
import { appApi } from './app-api';
import authSlice from '@/features/auth/store/authSlice';

export const store = () => {
  return configureStore({
    reducer: {
      auth: authSlice,
      [appApi.reducerPath]: appApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(appApi.middleware),
  })
}

// Infer the type of store
export type AppStore = ReturnType<typeof store>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
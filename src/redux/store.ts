import { configureStore } from '@reduxjs/toolkit';
import userReducer from './features/user/userSlice';
import booksSlice from './features/books/booksSlice';
import { api } from './api/apiSlice';

const store = configureStore({
  reducer: {
    auth: userReducer,
    books: booksSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

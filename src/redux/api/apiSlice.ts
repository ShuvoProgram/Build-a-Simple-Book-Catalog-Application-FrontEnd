import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../store';

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://build-a-simple-book-catalog-application-back-end.vercel.app/',

    prepareHeaders: (headers, api) => {
      const { auth } = api.getState() as RootState;
      if (auth.user) {
        headers.set('Authorization', `Bearer ${auth.user}`);
      }
      return headers;
    },
  }),
  tagTypes: ['comments', 'post', 'auth'],

  endpoints: () => ({}),
});

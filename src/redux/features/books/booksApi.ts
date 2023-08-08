/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '@/redux/api/apiSlice';
import { IFilter, IGetBooksResponse } from './booksSlice';
import { nanoid } from '@reduxjs/toolkit';

const bookApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postBooks: builder.mutation({
      query: (data) => ({
        url: `/book`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [{ type: 'post', id: 'LIST' }],
    }),
    getBooks: builder.query({
      query: () => '/books',
    }),
    singleBook: builder.query({
      query: (id) => `/book/${id}`,
    }),
    patchBook: builder.mutation({
      query: (data) => {
        return {
          url: `/book/${data.id}`,
          method: 'PATCH',
          body: data,
        };
      },
    }),
    searchBooks: builder.query<IGetBooksResponse, { query: string }>({
      query: ({ query }) => `/books/search?=${query}`,
    }),
    getFilter: builder.query<IFilter[], void>({
      query: () => '/books/categories',
      transformResponse: (response: string[]) =>
        response.map((category) => ({
          id: nanoid(),
          name: category,
        })),
    }),
    getFilterBooks: builder.query<IGetBooksResponse, { filter: string }>({
      query: ({ filter }) => `/books/category/${filter}`,
    }),
  }),
});

export const {
  usePostBooksMutation,
  useGetBooksQuery,
  useSingleBookQuery,
  usePatchBookMutation,
  useLazySearchBooksQuery,
  useGetFilterQuery,
  useGetFilterBooksQuery,
} = bookApi;

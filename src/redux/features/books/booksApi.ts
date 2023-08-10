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
    deleteBook: builder.mutation({
      query: (data) => {
        console.log(data);
        return {
          url: `/book/${data}`,
          method: 'DELETE',
          body: data,
        };
      },
      invalidatesTags: ['post'],
    }),
    wishlistBook: builder.mutation({
      query: (data) => ({
        url: `/wishlist`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['post'],
    }),
    getWishlistBook: builder.query({
      query: ({ query }) => `/wishlist?user=${query}`,
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
  useDeleteBookMutation,
  useLazySearchBooksQuery,
  useGetFilterQuery,
  useGetFilterBooksQuery,
  useWishlistBookMutation,
  useGetWishlistBookQuery,
} = bookApi;

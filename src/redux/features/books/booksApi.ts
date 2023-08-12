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
    recentGetBooks: builder.query({
      query: () => '/recent-books',
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
      query: (query) => {
        console.log(query);
        return {
          url: `/wishlist?user=${query}`,
          method: 'GET',
        };
      },
    }),
    deleteWishlist: builder.mutation({
      query: (data) => {
        return {
          url: `/wishlist/${data}`,
          method: 'DELETE',
          body: data,
        };
      },
      invalidatesTags: ['post'],
    }),
    searchBooks: builder.query({
      query: (query) => {
        return {
          url: `book?search=${query}`,
          method: 'GET',
        };
      },
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
  useRecentGetBooksQuery,
  useGetBooksQuery,
  useSingleBookQuery,
  usePatchBookMutation,
  useDeleteBookMutation,
  useSearchBooksQuery,
  useLazySearchBooksQuery,
  useGetFilterQuery,
  useGetFilterBooksQuery,
  useWishlistBookMutation,
  useGetWishlistBookQuery,
  useDeleteWishlistMutation,
} = bookApi;

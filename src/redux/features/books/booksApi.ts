/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '@/redux/api/apiSlice';
import { IGetBooksResponse } from './booksSlice';

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
    searchBooks: builder.query<IGetBooksResponse, { query: string }>({
      query: ({ query }) => `/books/search?=${query}`,
    }),
  }),
});

export const {
  usePostBooksMutation,
  useGetBooksQuery,
  useSingleBookQuery,
  useLazySearchBooksQuery,
} = bookApi;

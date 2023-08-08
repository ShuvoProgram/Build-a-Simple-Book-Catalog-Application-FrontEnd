/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '@/redux/api/apiSlice';

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    postUser: builder.mutation({
      query: credential => ({
        url: `/users`,
        method: 'POST',
        body: {...credential},
      })
    }),
  }),
});

export const { usePostUserMutation } = usersApi;
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
    getUser: builder.query({
      query: email => ({
        url: `/user/${email}`,
        method: 'GET',
    })
  })
})
});

export const { usePostUserMutation, useGetUserQuery, useLazyGetUserQuery } = usersApi;
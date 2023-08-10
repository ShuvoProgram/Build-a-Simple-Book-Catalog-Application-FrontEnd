/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '@/redux/api/apiSlice';
import { nanoid } from '@reduxjs/toolkit';
import { ILogin, ILoginResponse, IRegister, IUserResponse } from './userSlice';

const usersApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<ILoginResponse, ILogin>({
      query: credentials => ({
        url: '/auth/login',
        method: 'POST',
        body: credentials
      })
    }),
    register: builder.mutation<IUserResponse, IRegister>({
      query: user => ({
        url: '/users/add',
        method: 'POST',
        body: user,
      }),
      transformResponse: (response: IUserResponse) => ({ ...response, token: nanoid() }),
    }),
    getUser: builder.query<IUserResponse, string>({
      query: id => ({
        url: `/users/${id}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation, useGetUserQuery, useLazyGetUserQuery } = usersApi;
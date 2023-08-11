import { api } from '@/redux/api/apiSlice';

const reviewApi = api.injectEndpoints({
    endpoints: (builder) => ({
        postReview: builder.mutation({
            query: ({id, data}) => ({
                url: `/comment/${id}`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['comments']
        }),
        getReview: builder.query({
            query: (id) => `/comment/${id}`,
            providesTags: ['comments']
        })
    })
})

export const {usePostReviewMutation, useGetReviewQuery, useLazyGetReviewQuery} = reviewApi;
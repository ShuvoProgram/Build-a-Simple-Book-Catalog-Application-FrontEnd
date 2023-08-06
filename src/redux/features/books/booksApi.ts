/* eslint-disable @typescript-eslint/no-unused-vars */
import { api } from '@/redux/api/apiSlice';
// import { IBookData } from '@/types/globalTypes';

// // Action types
// const POST_BOOK_PENDING = 'POST_BOOK_PENDING';
// const POST_BOOK_SUCCESS = 'POST_BOOK_SUCCESS';
// const POST_BOOK_FAILURE = 'POST_BOOK_FAILURE';

// // Action interfaces
// interface PostBookStartPending {
//   type: typeof POST_BOOK_PENDING;
// }

// interface PostBookSuccessAction {
//   type: typeof POST_BOOK_SUCCESS;
//   payload: IBookData; // Replace 'BookData' with the appropriate type for your data
// }

// interface PostBookFailureAction {
//   type: typeof POST_BOOK_FAILURE;
//   error: string;
// }

// type BookAction =
//   | PostBookStartPending
//   | PostBookSuccessAction
//   | PostBookFailureAction;

// export const postBook = (formData: FormData) => {
//   return async (dispatch: Dispatch<BookAction>, _getState: () => RootState) => {
//     dispatch({ type: POST_BOOK_PENDING });
//     try {
//       // Perform the POST request using axios (or your preferred HTTP library)
//       const response = await axios.post('/book', formData);

//       dispatch({ type: POST_BOOK_SUCCESS, payload: response.data });
//     } catch (error) {
//       dispatch({ type: POST_BOOK_FAILURE, error: 'Failed to post book data' });
//     }
//   };
// };

// type PostsResponse = IBookData[];

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
  }),
});

export const { usePostBooksMutation, useGetBooksQuery, useSingleBookQuery } =
  bookApi;

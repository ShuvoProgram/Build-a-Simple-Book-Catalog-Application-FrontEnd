import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface BookState {
  loading: boolean;
  error: string | null;
  data: IBook[];
}

const initialState: BookState = {
  loading: false,
  error: null,
  data: [],
};

export interface IGetBooksResponse {
  books: IBook[];
  total: number;
  skip: number;
  limit: number;
}

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    postRequestPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    postRequestSuccess: (state, action: PayloadAction<IBook>) => {
      state.loading = true;
      state.data.push(action.payload);
    },
    postRequestFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setBooks: (state, action: PayloadAction<IBook>) => {
      state.loading = true;
      state.data.push(action.payload);
    },
  },
});

export const {
  postRequestPending,
  postRequestSuccess,
  postRequestFailed,
  setBooks,
} = bookSlice.actions;

export default bookSlice.reducer;

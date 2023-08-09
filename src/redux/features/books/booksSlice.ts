import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate?: string;
}

interface BookState {
  loading: boolean;
  error: string | null;
  data: IBook[];
  filter: IFilter[];
}

const initialState: BookState = {
  loading: false,
  error: null,
  data: [],
  filter: [],
};

export interface IGetBooksResponse {
  books: IBook[];
  total: number;
  skip: number;
  limit: number;
}

export interface IFilter {
  id: string;
  name: string;
}

const bookSlice = createSlice({
  name: 'books',
  initialState,
  reducers: {
    postRequestPending: (state) => {
      state.loading = true;
      state.error = null;
    },
    postRequestSuccess: (state) => {
      state.loading = false; // Corrected loading state
    },
    postRequestFailed: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    setBooks: (state, action: PayloadAction<IBook[]>) => {
      state.loading = false; // Corrected loading state
      state.data = action.payload; // Overwrite existing books
    },
    setFilter: (state: BookState, action: PayloadAction<IFilter[]>) => {
      state.filter = action.payload;
    },
    updateBook: (state, action: PayloadAction<IBook>) => {
      const updatedBook = action.payload;
      const index = state.data.findIndex((book) => book.id === updatedBook.id);
      if (index !== -1) {
        state.data[index] = {
          ...state.data[index],
          ...updatedBook,
        };
      }
    },
  },
});

export const {
  postRequestPending,
  postRequestSuccess,
  postRequestFailed,
  setBooks,
  setFilter,
  updateBook,
} = bookSlice.actions;

export const selectBookById = (state: { books: BookState }, bookId: string) =>
  state.books.data.find((book) => book.id === bookId);

export default bookSlice.reducer;

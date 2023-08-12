import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  id: string;
  title: string;
  author: string;
  genre: string;
  publicationDate: string;
}

interface BookState {
  loading: boolean;
  error: string | null;
  data: IBook[];
  filter: IFilter[];
  selectedGenre: string | null;
  selectedYear: string | null;
}

const initialState: BookState = {
  loading: false,
  error: null,
  data: [],
  filter: [],
  selectedGenre: null,
  selectedYear: null,
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
    setSelectedGenre: (state, action: PayloadAction<string | null>) => {
      state.selectedGenre = action.payload;
    },
    setSelectedYear: (state, action: PayloadAction<string | null>) => {
      state.selectedYear = action.payload;
    },
  },
});

export const {
  postRequestPending,
  postRequestSuccess,
  postRequestFailed,
  setBooks,
  setFilter,
  setSelectedGenre,
  setSelectedYear,
  updateBook,
} = bookSlice.actions;

export const selectBookById = (state: { books: BookState }, bookId: string) =>
  state.books.data.find((book) => book.id === bookId);

export const selectFilteredBooks = (state: RootState) => {
  const { data, selectedGenre, selectedYear } = state.books;

  let filteredBooks = [...data];

  if (selectedGenre) {
    filteredBooks = filteredBooks.filter(
      (book) => book.genre === selectedGenre
    );
  }

  if (selectedYear) {
    filteredBooks = filteredBooks.filter(
      (book) => book.publicationDate === selectedYear
    );
  }

  return filteredBooks;
};
export default bookSlice.reducer;

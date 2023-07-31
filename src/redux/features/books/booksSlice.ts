import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBook {
  id: string;
  title: string;
  author: string;
  description: string;
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
  },
});

export const { postRequestPending, postRequestSuccess, postRequestFailed } =
  bookSlice.actions;

export default bookSlice.reducer;

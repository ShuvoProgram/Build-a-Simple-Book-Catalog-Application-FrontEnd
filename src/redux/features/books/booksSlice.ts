import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IBooks {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: IBooks = {
  status: 'idle',
  error: null,
};

const bookSlice = createSlice({
  name: 'book',
  initialState,
  reducers: {
    postRequestPending: (state) => {
      state.status = 'loading';
      state.error = null;
    },
    postRequestSuccess: (state) => {
      state.status = 'succeeded';
    },
    postRequestFailed: (state, action: PayloadAction<string>) => {
      state.status = 'failed';
      state.error = action.payload;
    },
  },
});

export const { postRequestPending, postRequestSuccess, postRequestFailed } =
  bookSlice.actions;

export default bookSlice.reducer;

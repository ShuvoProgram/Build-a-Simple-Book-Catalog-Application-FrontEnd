/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppSelector } from '@/redux/hook';
import { RootState } from '@/redux/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface ILogin {
  email: string;
  password: string;
}

export interface ILoginResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
}

export interface IToken {
  token: string;
}

export interface IUserId {
  userId: number;
}

export interface IRegister {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface IUserResponse {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  gender: string;
  image: string;
  token: string;
  age: number;
  phone: string;
  password: string;
}

interface AuthState {
  token: string;
  userId: number;
  isLoading: boolean;
  isError: boolean;
  user: IUserResponse | null;
}

const initialState: AuthState = {
  token: '',
  userId: 0,
  user: null,
  isLoading: false,
  isError: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthToken: (state: AuthState, action: PayloadAction<IToken>) => {
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    setAuthUserId: (state: AuthState, action: PayloadAction<IUserId>) => {
      state.userId = action.payload.userId;
      localStorage.setItem('user', action.payload.userId.toString());
    },
    setUser: (state: AuthState, action: PayloadAction<IUserResponse>) => {
      state.user = action.payload;
      localStorage.setItem('userId', JSON.stringify(action.payload)); // Store user data in localStorage
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    logout: (state: AuthState) => {
      state.token = '';
      state.userId = 0;
      state.user = null;
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      localStorage.removeItem('user'); // Remove user data from localStorage
    },
  },
});

export const { setAuthToken, setAuthUserId, setUser, setLoading, logout } =
  authSlice.actions;

export default authSlice.reducer;

export const useAuthTokenSelector = () =>
  useAppSelector((state: RootState) => state.auth.token);
export const useAuthUserIdSelector = () =>
  useAppSelector((state: RootState) => state.auth.userId);
export const useAuthUserSelector = () =>
  useAppSelector((state: RootState) => state.auth.user);

import {
  setAuthToken,
  setUser,
  useAuthUserSelector,
} from '@/redux/features/user/userSlice';
import { useLazyGetUserQuery } from '@/redux/features/user/usersApi';
import { useEffect } from 'react';

export const useCheckAuthenticated = () => {
  const user = useAuthUserSelector();

  return user
    ? { user, isAuthenticated: true }
    : { user, isAuthenticated: false };
};

export const useAuth = () => {
  const [getUser] = useLazyGetUserQuery();

  async function initUser(id: string) {
    const { data } = await getUser(id);
    data && setUser(data);
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    token && setAuthToken({ token });

    const id = localStorage.getItem('userId');
    id && initUser(id);
  }, []); // eslint-disable-line
};

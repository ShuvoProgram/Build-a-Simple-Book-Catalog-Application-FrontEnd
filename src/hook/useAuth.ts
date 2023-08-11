import {
  setAuthToken,
  setUser,
  useAuthUserSelector,
} from '@/redux/features/user/userSlice';
import { useLazyGetUserQuery } from '@/redux/features/user/usersApi';
import { useEffect, useState } from 'react';

export const useCheckAuthenticated = () => {
  const user = useAuthUserSelector();

  return user
    ? { user, isAuthenticated: true }
    : { user, isAuthenticated: false };
};

export const useAuth = () => {
  const [isAuthLoaded, setIsAuthLoaded] = useState(false);
  const [getUser] = useLazyGetUserQuery();
  const authUser = useAuthUserSelector();

  // async function initUser(id: string) {
  //   const { data } = await getUser(id);
  //   data && setUser(data);
  // }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user'); // Get user data from localStorage

    if (token) {
      setAuthToken({ token });
      if (storedUser) {
        setUser(JSON.parse(storedUser)); // Set user data from localStorage
      }
    }

    token && setAuthToken({ token });

    const id = localStorage.getItem('userId');
    if (id && !authUser) {
      getUser(id)
        .then(({ data }) => {
          if (data) {
            setUser(data);
          }
        })
        .finally(() => {
          setIsAuthLoaded(true);
        });
    } else {
      setIsAuthLoaded(true);
    }
    // id && initUser(id);
  }, [authUser, getUser]);
  return { isAuthLoaded };
};

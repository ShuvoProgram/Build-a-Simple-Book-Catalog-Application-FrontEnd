import MainLayout from './layouts/MainLayout'

import { Toaster } from './components/ui/Toaster';

import './App.css';
import { useAppDispatch } from './redux/hook';
import { useEffect } from 'react';
import { setLoading, setUser } from './redux/features/user/userSlice';
import { auth } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';


function App() {
   const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setLoading(true))

    onAuthStateChanged(auth, (user) => {
      if(user) {
        dispatch(setUser(user.email!))
        dispatch(setLoading(false))
      } else {
        dispatch(setLoading(false))
      }
    })
  }, [dispatch])


  return (
    <>
    <Toaster/>
      <MainLayout/>
    </>
  )
}

export default App

import { useAppSelector } from '@/redux/hook';
import {ReactNode} from 'react';
import { Navigate, useLocation } from 'react-router-dom';

interface IProps {
    children: ReactNode;
}

export default function PrivateRoute({children}: IProps){
    const {user, isLoading} = useAppSelector((state) => state.auth);

    const token = localStorage.getItem('token');

    const {pathname} = useLocation();

    if(isLoading) {
        return <p>Loading...</p>;
    }

    if(!user?.email && !isLoading && token) {
        return <Navigate to='/login' state={{path: pathname}} />
    }
    return children;
}
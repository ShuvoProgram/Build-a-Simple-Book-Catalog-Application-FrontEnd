import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddedBooks from "@/pages/AddedBooks";
import Signup from "@/pages/signup";
import Login from "@/pages/Login";
import Books from "@/pages/Books";
import Search from "@/pages/Search";
import EditBook from "@/pages/EditBook";
import BookCrud from "@/pages/BookCrud";
import WishList from "@/pages/WishList";
import PrivateRoute from "./PrivateRoute";
import ReadingList from "@/pages/ReadingList";
import BooksDetails from "@/pages/BooksDetails";


const routes = createBrowserRouter([
    {
        path: '/',
        element: <App/>,
        children: [
            {
                index: true,
                element: <Home/>
            },
            {
                path: '/books',
                element: <Books />
            },
            {
                path: '/edit-books/:id',
                element: <PrivateRoute><EditBook/></PrivateRoute>
            },
            {
                path: '/books-details/:id',
                element: <BooksDetails/>
            },
            {
                path: '/search',
                element: <Search/>
            },
            {
                path: '/add-new-book',
                element: <PrivateRoute><AddedBooks /></PrivateRoute>
            },
            {
                path: '/dashboard/books',
                element: <PrivateRoute><BookCrud/></PrivateRoute>
            },
            {
                path: '/dashboard/wishlist',
                element: <PrivateRoute><WishList/></PrivateRoute>
            },
            {
                path: '/dashboard/reading-list',
                element: <PrivateRoute><ReadingList/></PrivateRoute>
            },
            {
                path: '/signup',
                element: <Signup/>
            },
            {
                path: '/login',
                element: <Login/>
            }
        ]
    }
])

export default routes;
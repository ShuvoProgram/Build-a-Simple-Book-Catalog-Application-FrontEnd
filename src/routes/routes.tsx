import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddedBooks from "@/pages/AddedBooks";
import Signup from "@/pages/signup";
import Login from "@/pages/Login";
import Books from "@/pages/Books";

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
                path: '/add-new-book',
                element: <AddedBooks />
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
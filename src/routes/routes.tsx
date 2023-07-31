import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddedBooks from "@/pages/AddedBooks";
import Signup from "@/pages/signup";

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
                path: '/add-new-book',
                element: <AddedBooks title={""} author={""} genre={""} publicationDate={""}/>
            },
            {
                path: '/signup',
                element: <Signup/>
            }
        ]
    }
])

export default routes;
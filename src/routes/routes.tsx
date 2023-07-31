import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import AddedBooks from "@/pages/AddedBooks";

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
            }
        ]
    }
])

export default routes;
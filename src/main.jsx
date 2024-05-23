import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/home.jsx';

import Root from "./routes/root";
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Menu from './pages/menu.jsx';
import Contact from './pages/contact.jsx';
import { Toaster, toast } from 'sonner'
import Produit from './pages/produit.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children:[
      {
        path: "",
        element: <Home/>,
      },
      {
        path: "menu",
        element: <Menu/>,
      },
      {
        path: "contact",
        element: <Contact/>,
      },
      {
        path: "produit/:id",
        element: <Produit/>
      },
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <Toaster position="top-center"/>
     <RouterProvider router={router} />
  </>,
)

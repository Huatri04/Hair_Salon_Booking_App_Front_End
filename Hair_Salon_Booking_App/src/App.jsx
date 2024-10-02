import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer/index.jsx";
import RegisterCustomer from "./pages/RegisterCustomer/index.jsx";
import Default_template from "./components/default_template/index.jsx";
import About from "./pages/About/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import Manager_page from "./components/manager_page/index.jsx";
import Home_admin from "./pages/Home_admin/index.jsx";

function App() {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Default_template />,

      children: [
        {
          path: "about",
          element: <About />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
      ],
    },

    {
      path: "loginCustomer",
      element: <LoginCustomer />,
    },
    {
      path: "registerCustomer",
      element: <RegisterCustomer />,
    },
    {
      path: "manager_page",
      element: <Manager_page />,
      children: [],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

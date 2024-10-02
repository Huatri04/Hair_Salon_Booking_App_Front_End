import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer/index.jsx";
import RegisterCustomer from "./pages/RegisterCustomer/index.jsx";
import HomePage from "./pages/Home/index.jsx";
import Default_template from "./components/default_template/index.jsx";
import About from "./pages/About/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import Admin from "./components/admin_page/index.jsx";
import ManageServices from "./pages/ManageServices/index.jsx";
import Employees from "./pages/ManageEmployees/index.jsx";
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
      path: "admin_page",
      element: <Admin />,
      children: [
        {
          path: "home_admin",
          element: <Home_admin />,
        },
        {
          path: "services",
          element: <ManageServices />,
        },
        {
          path: "employees",
          element: <Employees />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

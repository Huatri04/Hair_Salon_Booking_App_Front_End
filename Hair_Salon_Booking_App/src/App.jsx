import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Manager_page from "./components/manager_page";
import Home_admin from "./pages/Home_admin";
import LoginEmployee from "./pages/LoginEmployee";

function App() {
  const router = createBrowserRouter([
    {
      path: "manager_page",
      element: <Manager_page />,
      children: [
        {
          path: "home_admin",
          element: <Home_admin />,
        },
      ],
    },
    {
      path: "loginEmployee",
      element: <LoginEmployee />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

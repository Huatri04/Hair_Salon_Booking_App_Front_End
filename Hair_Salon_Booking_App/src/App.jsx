import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer/index.jsx";
import RegisterCustomer from "./pages/RegisterCustomer/index.jsx";
import HomePage from "./pages/Home/index.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "",
      element: <HomePage />,
    },
    {
      path: "loginCustomer",
      element: <LoginCustomer />,
    },
    {
      path: "registerCustomer",
      element: <RegisterCustomer />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

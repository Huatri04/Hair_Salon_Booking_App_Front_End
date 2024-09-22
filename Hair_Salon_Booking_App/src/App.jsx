import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer";

function App() {
  const router = createBrowserRouter([
    {
      path: "loginCustomer",
      element: <LoginCustomer />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Manager_page from "./components/manager_page";

function App() {
  const router = createBrowserRouter([
    {
      path: "manager_page",
      element: <Manager_page />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Adminpage from "./components/admin_page";

function App() {
  const router = createBrowserRouter([
    {
      path: "admin_page",
      element: <Adminpage />,
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

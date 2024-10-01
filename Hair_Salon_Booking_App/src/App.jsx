import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer/index.jsx";
import RegisterCustomer from "./pages/RegisterCustomer/index.jsx";
import Default_template from "./components/default_template/index.jsx";
import Home from "./pages/Home/index.jsx";
import About from "./pages/About/index.jsx";
import Contact from "./pages/Contact/index.jsx";
function App() {
  const router = createBrowserRouter([
    {
      path: "/*",
      element: <Default_template />,
      children: [
        {
          path: "home",
          element: <Home />,
        },
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
  ]);

  return <RouterProvider router={router} />;
}

export default App;

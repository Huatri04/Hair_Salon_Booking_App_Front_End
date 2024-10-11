import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import Manager_page from "./components/manager_page";
import Home_employee from "./pages/Home_employee";
import LoginEmployee from "./pages/LoginEmployee";
import Feedback from "./pages/FeedbackManagement";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ShiftManagement from "./pages/ShiftManagement";
import VoucherProgram from "./pages/VoucherProgram";
function App() {
  const ProtectRouteAuth = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "Manager") {
      return children;
    }
    toast.error("You are not allowed to access this page");
    return <Navigate to={"/loginEmployee"} />;
  };

  const router = createBrowserRouter([
    {
      path: "manager_page",

      element: (
        <ProtectRouteAuth>
          <Manager_page />
        </ProtectRouteAuth>
      ),
      children: [
        {
          path: "home_employee",
          element: <Home_employee />,
        },
        {
          path: "feedbacks",
          element: <Feedback />,
        },
        {
          path: "shiftManagement",
          element: <ShiftManagement />,
        },
        {
          path: "voucherProgram",
          element: <VoucherProgram />,
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

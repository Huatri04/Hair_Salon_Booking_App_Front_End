import React from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import LoginCustomer from "./pages/LoginCustomer/index.jsx";
import RegisterCustomer from "./pages/RegisterCustomer/index.jsx";
import Default_template from "./components/default_template/index.jsx";
import About from "./pages/About/index.jsx";
import Contact from "./pages/Contact/index.jsx";
import Default_template_logged_in from "./components/default_template_logged_in/index.jsx";
import MyProfile from "./pages/MyProfile/index.jsx";
import HistoryServices from "./pages/HistoryServices/index.jsx";
import LoyalPoint from "./pages/LoyalPoints/index.jsx";
import BookingAppointment from "./pages/Booking/index.jsx";
import SoftwareSupportApplication from "./components/SoftwareSupportApplication/index.jsx";
import BookingService from "./pages/BookingService/indes.jsx";
import BookingSuccess from "./pages/BookingSuccess/index.jsx";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import Admin from "./components/admin_page/index.jsx";
import LoginEmployee from "./pages/LoginEmployee/index.jsx";
import ServiceManagement from "./pages/ServiceManagement/ServiceManagement.jsx";
import EmployeeManagement from "./pages/EmployeeMangament/EmployeeManagement.jsx";
import Manager_page from "./components/manager_page/index.jsx";

function App() {
  const ProtectRouteAuthAdmin = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "Admin") {
      return children;
    }
    toast.error("You are not allowed to access this page");
    return <Navigate to={"/loginEmployee"} />;
  };

  const ProtectRouteAuthManager = ({ children }) => {
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
      path: "loginEmployee",
      element: <LoginEmployee />,
    },
    {
      path: "manager_page",
      element: (
        <ProtectRouteAuthManager>
          <Manager_page />
        </ProtectRouteAuthManager>
      ),
    },
    {
      path: "adminPage",
      element: (
        <ProtectRouteAuthAdmin>
          <Admin />
        </ProtectRouteAuthAdmin>
      ),
      children: [
        {
          path: "services",
          element: <ServiceManagement />,
        },
        {
          path: "employees",
          element: <EmployeeManagement />,
        },
      ],
    },

    {
      path: "logged_in",
      element: <Default_template_logged_in />,
      children: [
        {
          path: "softwareSupportApplication",
          element: <SoftwareSupportApplication />,
        },
        {
          path: "booking",
          element: <BookingAppointment />,
        },
        {
          path: "bookingService",
          element: <BookingService />,
        },
        {
          path: "about",
          element: <About />,
        },
        {
          path: "loyalPoints",
          element: <LoyalPoint />,
        },
        {
          path: "contact",
          element: <Contact />,
        },
        {
          path: "myProfile",
          element: <MyProfile />,
        },
        {
          path: "historyOfServices",
          element: <HistoryServices />,
        },
        {
          path: "bookSuccessful",
          element: <BookingSuccess />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

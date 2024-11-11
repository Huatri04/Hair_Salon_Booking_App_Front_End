import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
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
          path: "loyalPoints",
          element: <LoyalPoint />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
}

export default App;

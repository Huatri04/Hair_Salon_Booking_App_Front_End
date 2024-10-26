import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./components/admin_page/index.jsx";
import EmployeeManagement from "./pages/EmployeeMangament/EmployeeManagement.jsx";
import SoftwareSupportOrderManagement from "./pages/SoftwareSupportOrderManagement/SoftwareSupportOrderManagement.jsx";
import ServiceManagement from "./pages/ServiceManagement/ServiceManagement.jsx";
import CustomerAccountManagememnt from "./pages/CustomerAccountManagement/customerAccountManagement.jsx";
<<<<<<< Updated upstream
import SupportApplicationOfCustomer from "./pages/SupportApplicationOfCustomer/index.jsx";
import LoginEmployee from "./pages/LoginEmployee/index.jsx";
import Home_employee from "./pages/Home_employee/index.jsx";


function App() {
  
  const router = createBrowserRouter([
    {
      path: "loginEmployee",
      element: <LoginEmployee />,
=======
import SupportApplicationOfCustomer from "./pages/SupportApplicationOfCustomer/SupportApplicationOfCustomer.jsx";
import LoginEmployee from "./pages/LoginEmployee/index.jsx";
import Home_employee from "./pages/Home_employee/index.jsx";
import Stylist_page from "./components/stylist_page/index.jsx";
import Listhistorysoftwaresupportapplication from "./pages/Listhistorysoftwaresupportapplication/index.jsx";
import Workschedule from "./pages/Workschedule/index.jsx";
import Listhistorysalary from "./pages/ListHistorySalary/index.jsx";
import Listhistorysalary_staff from "./pages/Listhistorysalary_staff/index.jsx";
import Workschedule_staff from "./pages/workschedule_staff/index.jsx";
import Listhistorysoftwaresupportapplication_staff from "./pages/Listhistorysoftwaresupportapplication_staff/index.jsx";
import Staff_page from "./components/staff_page/index.jsx";
import AppointmentManagement_staff from "./pages/AppointmentManagement_staff/AppointmentManagement_staff.jsx";
import AppointmentManagement from "./pages/AppointmentManagement/AppointmentManagement.jsx";


function App() {
 
  const router = createBrowserRouter([
    {
      path: "loginEmployee",
      element: <LoginEmployee/>,
    },
   
    {
      path: "staff_page",
      element: <Staff_page/>,
      children: [
        {
          path: "home_employee",
          element: < Home_employee/>,
        },
        {
          path: "listhistorysoftwaresupportapplication_staff",
          element: < Listhistorysoftwaresupportapplication_staff/>,
        },
        {
          path: "workschedule_staff",
          element: < Workschedule_staff/>,
        },
        {
          path: "listhistorysalary_staff",
          element: < Listhistorysalary_staff/>,
        },
        {
          path: "appointmentmanagement_staff",
          element: < AppointmentManagement_staff/>,
        },
      ]
    },

    {
      path: "stylist_page",
      element: <Stylist_page/>,
      children: [
        {
          path: "home_employee",
          element: < Home_employee/>,
        },
        {
          path: "listhistorysoftwaresupportapplication",
          element: < Listhistorysoftwaresupportapplication/>,
        },
        {
          path: "workschedule",
          element: < Workschedule/>,
        },
        {
          path: "listhistorysalary",
          element: < Listhistorysalary/>,
        },
        {
          path: "appointmentmanagement",
          element: < AppointmentManagement/>,
        },
      ]
>>>>>>> Stashed changes
    },
    {
      path: "admin_page",
      element: <Admin />,
      children: [
        {
          path: "home_employee",
          element: < Home_employee/>,
        },
        {
          path: "services",
          element: <ServiceManagement />,
        },
        {
          path: "employee",
          element: <EmployeeManagement />,
        },
        {
          path: "SoftwareSupportOrderManagement",
          element: < SoftwareSupportOrderManagement/>,
        },
        {
          path: "CustomerAccountManagememnt",
          element: <CustomerAccountManagememnt />,
        },
        {
          path: "SupportApplicationOfCustomer",
          element: <SupportApplicationOfCustomer />,
        },
      ],
    },
    
    
  ]);
  return <RouterProvider router={router} />;
}

export default App;

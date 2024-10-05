import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./components/admin_page/index.jsx";
import EmployeeManagement from "./pages/EmployeeMangament/EmployeeManagement.jsx";
import SoftwareSupportOrderManagement from "./pages/SoftwareSupportOrderManagement/SoftwareSupportOrderManagement.jsx";
import ServiceManagement from "./pages/ServiceManagement/ServiceManagement.jsx";
import CustomerAccountManagememnt from "./pages/CustomerAccountManagement/customerAccountManagement.jsx";
import SupportApplicationOfCustomer from "./pages/SupportApplicationOfCustomer/index.jsx";
import LoginEmployee from "./pages/LoginEmployee/index.jsx";
import Home_employee from "./pages/Home_employee/index.jsx";


function App() {
  
  const router = createBrowserRouter([
    {
      path: "loginEmployee",
      element: <LoginEmployee />,
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

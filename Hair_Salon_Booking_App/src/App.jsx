import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import Admin from "./components/admin_page/index.jsx";
import Home_admin from "./pages/Home_admin/index.jsx";
import EmployeeManagement from "./pages/EmployeeMangament/EmployeeManagement.jsx";
import SoftwareSupportOrderManagement from "./pages/SoftwareSupportOrderManagement/SoftwareSupportOrderManagement.jsx";
import ServiceManagement from "./pages/ServiceManagement/ServiceManagement.jsx";
import CustomerAccountManagememnt from "./pages/CustomerAccountManagement/customerAccountManagement.jsx";
import SupportApplicationOfCustomer from "./pages/SupportApplicationOfCustomer/index.jsx";


function App() {
  
  const router = createBrowserRouter([
   
    {
      path: "admin_page",
      element: <Admin />,
      children: [
        {
          path: "home_admin",
          element: <Home_admin />,
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

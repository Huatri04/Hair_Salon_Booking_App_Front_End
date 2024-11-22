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
import ShiftInWeek from "./pages/ShiftInWeek/index.jsx";
import ShiftEmployee from "./pages/ShiftEmployee/index.jsx";
import ShiftFree from "./pages/ShiftFree/index.jsx";
import StylistManagement from "./pages/StylistManagement/index.jsx";
import Feedback from "./pages/FeedbackManagement/index.jsx";
import ProfileEmployee from "./pages/ProfileEmployee/index.jsx";
import Staff_page from "./components/staff_page/index.jsx";
import ManagementAppointment from "./pages/ManagementAppointment/index.jsx";
import BookingStaff from "./pages/BookingStaff/index.jsx";
import BookingServiceStaff from "./pages/BookingServiceStaff/index.jsx";
import BookingSuccessStaff from "./pages/BookingSuccessStaff/index.jsx";
import BasicSalaryManagement from "./pages/BasicSalaryManagement/index.jsx";
import TransactionManagement from "./pages/TransactionManagement/index .jsx";
import Dashboard from "./pages/Dashboard/index.jsx";
import PaymentCash from "./pages/PaymentCash/index.jsx";
import SalaryMonths from "./pages/SalaryMonths/index.jsx";
import PaymentOnline from "./pages/PaymentOnline/index.jsx";
import PaymentOnlineFail from "./pages/PaymentOnlineFail/index.jsx";
import ListOfSlots from "./pages/ListOfSlots/index.jsx";
import ListOfShifts from "./pages/ListOfShifts/index.jsx";
import ShiftAvailable from "./pages/shiftAvailable/index.jsx";
import VoucherProgram from "./pages/VocherProgram/index.jsx";
import Stylist_page from "./components/stylist_page/index.jsx";
import Listhistorysalary_staff from "./pages/listHistorySalary/index.jsx";
import WeeklyTimetable from "./pages/WeeklyTimeTable/index.jsx";
import Listhistorysoftwaresupportapplication_staff from "./pages/SoftWareSupportEmployees/index.jsx";
import SupportApplicationOfCustomer from "./pages/ListSoftWareCustomer/index.jsx";
import ManageCustomer from "./pages/ManageCustomer/index.jsx";
import ManagerBannedCustomer from "./pages/ManagerBannedCustomer/index.jsx";
import ManagerBannedEmployee from "./pages/ManageBannedEmployee/index.jsx";

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
  const ProtectRouteAuthCustomer = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user) {
      return children;
    }
    toast.error("You are not allowed to access this page");
    return <Navigate to={"/loginCustomer"} />;
  };
  const ProtectRouteAuthStaff = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "Staff") {
      return children;
    }
    toast.error("You are not allowed to access this page");
    return <Navigate to={"/loginEmployee"} />;
  };

  const ProtectRouteAuthStylist = ({ children }) => {
    const user = useSelector((store) => store.user);
    console.log(user);
    if (user && user?.role === "Stylist") {
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
      children: [
        {
          path: "shiftInWeek",
          element: <ShiftInWeek />,
        },
        {
          path: "shiftAvailable",
          element: <ShiftAvailable />,
        },
        {
          path: "transactionManagement",
          element: <TransactionManagement />,
        },
        {
          path: "shiftEmployee",
          element: <ShiftEmployee />,
        },
        {
          path: "shiftFree",
          element: <ShiftFree />,
        },
        {
          path: "voucherProgram",
          element: <VoucherProgram />,
        },
        {
          path: "stylistManagement",
          element: <StylistManagement />,
        },
        {
          path: "softwareSupport",
          element: <SoftwareSupportApplication />,
        },
        {
          path: "salaryMonths",
          element: <SalaryMonths />,
        },
        {
          path: "feedbackManagement",
          element: <Feedback />,
        },
        {
          path: "employee_account",
          element: <ProfileEmployee />,
        },
        {
          path: "manage_basic_salary",
          element: <BasicSalaryManagement />,
        },
        {
          path: "dash_board",
          element: <Dashboard />,
        },
      ],
    },
    {
      path: "staff_page",
      element: (
        <ProtectRouteAuthStaff>
          <Staff_page />
        </ProtectRouteAuthStaff>
      ),
      children: [
        {
          path: "listhistorysalary",
          element: <Listhistorysalary_staff />,
        },
        {
          path: "employee_account",
          element: <ProfileEmployee />,
        },
        {
          path: "listOfSlots",
          element: <ListOfSlots />,
        },
        {
          path: "listOfShifts",
          element: <ListOfShifts />,
        },
        {
          path: "appointmentManagement",
          element: <ManagementAppointment />,
        },
        {
          path: "softwareSupport",
          element: <SoftwareSupportApplication />,
        },
        {
          path: "booking",
          element: <BookingStaff />,
        },
        {
          path: "bookingService",
          element: <BookingServiceStaff />,
        },
        {
          path: "Thanh toán tiền mặt thành công.",
          element: <PaymentCash />,
        },
        {
          path: "paymentSuccessful",
          element: <PaymentOnline />,
        },

        {
          path: "paymentFail",
          element: <PaymentOnlineFail />,
        },

        {
          path: "bookSuccessful",
          element: <BookingSuccessStaff />,
        },
      ],
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
          path: "bannedCustomerAccount",
          element: <ManagerBannedCustomer />,
        },
        {
          path: "bannedEmployeeAccount",
          element: <ManagerBannedEmployee />,
        },
        {
          path: "customerAccount",
          element: <ManageCustomer />,
        },
        {
          path: "employee_account",
          element: <ProfileEmployee />,
        },
        {
          path: "listhistorysalary",
          element: <Listhistorysalary_staff />,
        },
        {
          path: "services",
          element: <ServiceManagement />,
        },
        {
          path: "employees",
          element: <EmployeeManagement />,
        },
        {
          path: "listSoftWareSupport",
          element: <Listhistorysoftwaresupportapplication_staff />,
        },
        {
          path: "listSoftWareSupportCustomer",
          element: <SupportApplicationOfCustomer />,
        },
      ],
    },

    {
      path: "logged_in",
      element: (
        <ProtectRouteAuthCustomer>
          <Default_template_logged_in />
        </ProtectRouteAuthCustomer>
      ),
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
    {
      path: "stylistPage",
      element: (
        <ProtectRouteAuthStylist>
          <Stylist_page />
        </ProtectRouteAuthStylist>
      ),
      children: [
        {
          path: "listhistorysalary",
          element: <Listhistorysalary_staff />,
        },
        {
          path: "employee_account",
          element: <ProfileEmployee />,
        },
        {
          path: "weeklyTimetable",
          element: <WeeklyTimetable />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;

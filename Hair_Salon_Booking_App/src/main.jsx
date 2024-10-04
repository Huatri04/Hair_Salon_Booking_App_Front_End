import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import EmployeeManagement from "./pages/EmployeeMangament/EmployeeManagement.jsx";
import 'react-toastify/dist/ReactToastify.css'
import { ToastContainer } from "react-toastify";
createRoot(document.getElementById("root")).render(
<App/>
);

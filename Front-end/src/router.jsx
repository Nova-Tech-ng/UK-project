import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegister";
import NotFoundPage from "./Pages/NotFoundPage";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentLogin from "./Student/StudentLogin";
import StudentRegister from "./Student/StudentRegister";
import StudentDashboard from "./Student/StudentDashboard";
import DataEntryPage from "./Student/DataEntryPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/admin/login",
    element: <AdminLogin />,
  },
  {
    path: "/admin/register",
    element: <AdminRegister />,
  },
  {
    path: "/admin/dashboard",
    element: <AdminDashboard />,
  },
  {
    path: "/student/login",
    element: <StudentLogin />,
  },
  {
    path: "/student/register",
    element: <StudentRegister />,
  },
  {
    path: "/student/data",
    element: <DataEntryPage />,
  },
  {
    path: "/student/studentdashboard",
    element: <StudentDashboard />,
  },
]);

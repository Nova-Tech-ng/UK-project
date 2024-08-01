import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import NotFoundPage from "./Pages/NotFoundPage";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import StudentLearningResource from "./Dashboard/Student/StudentLearningResource";
import Login from "./Pages/Login";
import SignUpForm from "./Pages/SignUp";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUpForm />,
  },
  {
    path: "/dashboard",
    element: <StudentDashboard />,
  },
  {
    path: "/learning-resources",
    element: <StudentLearningResource />,
  },
  {
    path: "/admindashboard",
    element: <AdminDashboard />,
  },
]);

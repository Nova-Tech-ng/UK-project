import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import AdminLogin from "./Admin/AdminLogin";
import AdminRegister from "./Admin/AdminRegister";
import AdminDashboard from "./Admin/AdminDashboard";
import StudentLogin from "./Student/StudentLogin";
import StudentRegister from "./Student/StudentRegister";
import StudentDashboard from "./Student/StudentDashboard";
import DataEntryPage from "./Student/DataEntryPage";
import NotFoundPage from "./Pages/NotFoundPage";
import StudentLearningResource from "./Student/StudentLearningResource";
import StudentList from "./Admin/StudentList";
import StudentDetails from "./Admin/StudentDetails";
import LetsGetToKnowYou from "./Student/GetToKnowStudent";
import CourseTable from "./Student/StudentDataTable";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "admin",
    children: [
      { path: "login", element: <AdminLogin /> },
      { path: "register", element: <AdminRegister /> },
      { path: "dashboard", element: <AdminDashboard /> },
      { path: "students", element: <StudentList /> },
      { path: "students/:id", element: <StudentDetails /> },
    ],
  },
  {
    path: "student",
    children: [
      { path: "login", element: <StudentLogin /> },
      { path: "register", element: <StudentRegister /> },
      { path: "getstudentinfo", element: <LetsGetToKnowYou /> },
      { path: "data", element: <DataEntryPage /> },
      { path: "dashboard", element: <StudentDashboard /> },
      { path: "learning-resources", element: <StudentLearningResource /> },
      { path: "example", element: <CourseTable /> },
    ],
  },
]);

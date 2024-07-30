import React from "react";
import AdminDashboard from "./Dashboard/Admin/AdminDashboard";
import StudentDashboard from "./Dashboard/Student/StudentDashboard";
import StudentLearningResource from "./Dashboard/Student/StudentLearningResource";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import DataEntryPage from "./Dashboard/Student/DataEntryPage";
import CourseDetail from "./Dashboard/Student/CourseDetail";

function App() {
  return (
    <div>
      {/* <AdminDashboard /> */}
      {/* <SignUp /> */}
      {/* <Login /> */}
      <StudentDashboard />
      {/* <StudentLearningResource /> */}
      {/* <DataEntryPage /> */}
      {/* <CourseDetail /> */}
    </div>
  );
}

export default App;

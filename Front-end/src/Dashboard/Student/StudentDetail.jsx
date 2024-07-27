import React from "react";
import { useParams } from "react-router-dom";
import { studentData } from "../Admin/AdminDashboard";

const StudentDetail = () => {
  const { id } = useParams();

  // Fetch student details based on the id
  // This is a placeholder. Replace with actual data fetching logic.
  const student = studentData.find((student) => student.id.toString() === id);

  return (
    <div>
      <h1>Student Detail for {student.name}</h1>
      <p>Gender: {student.gender}</p>
      <p>Predicted Grade: {student.predicted}%</p>
      <p>Attendance Rate: {student.attendance}%</p>
      <p>Assignment Scores: {student.assignment}%</p>
      <p>GPA: {student.gpa}</p>
    </div>
  );
};

export default StudentDetail;

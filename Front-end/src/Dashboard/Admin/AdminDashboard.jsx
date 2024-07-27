import React, { useState } from "react";
import Modal from "../Admin/Modal";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: "2021", PredictedGrade: 70, ActualGrade: 50 },
  { year: "2022", PredictedGrade: 30, ActualGrade: 60 },
  { year: "2023", PredictedGrade: 60, ActualGrade: 55 },
  { year: "2024", PredictedGrade: 70, ActualGrade: 40 },
];

export const studentData = [
  {
    id: 194,
    gender: "Female",
    name: "Grace Evans",
    PredictedGrade: 89,
    attendance: 89,
    assignment: 89,
    gpa: 3.74,
    status: "Pending",
  },
  {
    id: 233,
    gender: "Male",
    name: "Maro Oghenerukwe",
    PredictedGrade: 90,
    attendance: 94,
    assignment: 94,
    gpa: 3.92,
    status: "Pending",
  },
  {
    id: 921,
    gender: "Male",
    name: "Matthew Jonathan",
    PredictedGrade: 75,
    attendance: 25,
    assignment: 25,
    gpa: 1.45,
    status: "At Risk",
  },
  {
    id: 183,
    gender: "Female",
    name: "Glory Evans",
    PredictedGrade: 76,
    attendance: 56,
    assignment: 56,
    gpa: 2.85,
    status: "Pending",
  },
  {
    id: 219,
    gender: "Male",
    name: "Wila Amirs",
    PredictedGrade: 55,
    attendance: 62,
    assignment: 62,
    gpa: 3.02,
    status: "pending",
  },
];

const AdminDashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="border p-2 ">
          <label className="block mb-2">Select Course</label>
          <select className="border p-2 rounded shadow-lg w-full">
            <option>All</option>
          </select>
        </div>
        <div className="border p-2">
          <label className="block mb-2">Select Grade Level</label>
          <select className="border p-2 rounded shadow-lg w-full">
            <option>All</option>
          </select>
        </div>
        <div className="border p-2 rounded flex items-center justify-center shadow-lg">
          <span className="text-3xl">3.75</span>
          <span className="ml-2">Overall Class Performance</span>
        </div>
        <div className="border p-2 rounded flex items-center justify-center shadow-lg">
          <span className="text-3xl">433</span>
          <span className="ml-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 14l9-5-9-5-9 5 9 5zm0 0v5a3 3 0 01-3 3H6a3 3 0 01-3-3v-5m15 0v5a3 3 0 01-3 3h-3a3 3 0 01-3-3v-5m0 0L3 9"
              />
            </svg>
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="border p-4 rounded shadow-lg">
          <h2 className="text-center mb-4">Average Grade Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="PredictedGrade" fill="#D25D09" />
              <Bar dataKey="ActualGrade" fill="#4567B7" />
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="border p-4 rounded shadow-lg">
          <h2 className="text-center">Accuracy of Trained Model</h2>
          {/* Placeholder for accuracy chart */}
        </div>
      </div>

      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Academic Details of Students</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto">
            <thead>
              <tr className="bg-[#EAF1EF]">
                <th className="px-4 py-2 border">Student ID</th>
                <th className="px-4 py-2 border">Gender</th>
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border">Predicted Grade</th>
                <th className="px-4 py-2 border">Attendance Rate</th>
                <th className="px-4 py-2 border">Assignment Scores</th>
                <th className="px-4 py-2 border">GPA</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr
                  key={student.id}
                  className={`${
                    student.gpa < 2 ? "bg-red-200" : ""
                  } cursor-pointer`}
                  onClick={() => handleRowClick(student)}
                >
                  <td className="border px-4 py-2">{student.id}</td>
                  <td className="border px-4 py-2">{student.gender}</td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">
                    {student.PredictedGrade}%
                  </td>
                  <td className="border px-4 py-2">{student.attendance}%</td>
                  <td className="border px-4 py-2">{student.assignment}%</td>
                  <td className="border px-4 py-2">{student.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        student={selectedStudent}
      />
    </div>
  );
};

export default AdminDashboard;

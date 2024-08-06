import React from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import studentgraduate from "../assets/studentgraduate.svg";
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
import StudentList from "./StudentList";

const data = [
  { year: "2021", PredictedGrade: 70, ActualGrade: 50 },
  { year: "2022", PredictedGrade: 30, ActualGrade: 60 },
  { year: "2023", PredictedGrade: 60, ActualGrade: 55 },
  { year: "2024", PredictedGrade: 70, ActualGrade: 40 },
];

const studentData = [
  { id: 1, name: "Grace Evans", predictedGrade: 89, actualGrade: 89 },
  { id: 2, name: "Maro Oghenereukevwe", predictedGrade: 90, actualGrade: 94 },
  { id: 3, name: "Matthew Jonathan", predictedGrade: 75, actualGrade: 25 },
  { id: 4, name: "Glory Evans", predictedGrade: 76, actualGrade: 56 },
  { id: 5, name: "Wila Amirs", predictedGrade: 55, actualGrade: 62 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/admin/login"); // Redirect to the login page
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaRegUserCircle size={30} />
          <p className="ml-2">Admin</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="border p-4 rounded shadow-lg">
          <label className="block mb-2 font-semibold">Select Course</label>
          <select className="border p-2 w-full">
            <option>All</option>
          </select>
        </div>
        <div className="border p-4 rounded shadow-lg flex items-center justify-between">
          <img
            src={studentgraduate}
            alt="studentgraduate"
            className="w-12 h-12"
          />
          <div>
            <p className="font-semibold text-right">Students</p>
            <p className="text-3xl font-semibold text-right">433</p>
          </div>
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
          <h2 className="text-center mb-4">Accuracy of Trained Model</h2>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Student ID</th>
                <th className="px-4 py-2">Student Name</th>
                <th className="px-4 py-2">Predicted Grade</th>
                <th className="px-4 py-2">Actual Grade</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student) => (
                <tr key={student.id}>
                  <td className="border px-4 py-2">{student.id}</td>
                  <td className="border px-4 py-2">{student.name}</td>
                  <td className="border px-4 py-2">
                    {student.predictedGrade}%
                  </td>
                  <td className="border px-4 py-2">{student.actualGrade}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Student Data</h2>
        <StudentList students={studentData} />
      </div>
    </div>
  );
};

export default AdminDashboard;

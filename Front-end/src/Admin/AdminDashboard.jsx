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

const data = [
  { year: "2021", PredictedGrade: 70, ActualGrade: 50 },
  { year: "2022", PredictedGrade: 30, ActualGrade: 60 },
  { year: "2023", PredictedGrade: 60, ActualGrade: 55 },
  { year: "2024", PredictedGrade: 70, ActualGrade: 40 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    navigate("/admin/login"); // Redirect to the login page
  };

  const handleViewStudents = () => {
    navigate("/admin/students");
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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4">
        <div className="border p-2 rounded shadow-lg">
          <label className="block mb-2 font-semibold">Select Course</label>
          <select className="border p-2 w-full">
            <option>All</option>
          </select>
        </div>
        <div className="border p-2 rounded shadow-lg">
          <label className="block mb-2 font-semibold">Select Grade Level</label>
          <select className="border p-2 w-full">
            <option>All</option>
          </select>
        </div>
        <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
          <span className="ml-2 font-semibold">Overall Class Performance</span>
          <div className="flex justify-end">
            <p className="text-5xl font-semibold">3.75</p>
          </div>
        </div>
        <div className="border p-2 rounded shadow-lg flex justify-between px-4">
          <img src={studentgraduate} alt="studentgraduate" />
          <div className="flex flex-col justify-between">
            <p className="flex justify-end font-semibold">Students</p>
            <p className="text-5xl font-semibold">433</p>
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
          <h2 className="text-center">Accuracy of Trained Model</h2>
          {/* Placeholder for accuracy chart */}
        </div>
      </div>

      <button
        onClick={handleViewStudents}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        View Students
      </button>
    </div>
  );
};

export default AdminDashboard;

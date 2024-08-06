import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import StudentLearningResource from "./StudentLearningResource";
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
import { useNavigate, useLocation } from "react-router";

const data = [
  { year: "2021", PredictedGrade: 70, ActualGrade: 50 },
  { year: "2022", PredictedGrade: 30, ActualGrade: 60 },
  { year: "2023", PredictedGrade: 60, ActualGrade: 55 },
  { year: "2024", PredictedGrade: 70, ActualGrade: 40 },
];

const StudentDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("dashboard");
  const [studentName, setStudentName] = useState("");

  useEffect(() => {
    const currentPath = location.pathname.split("/")[2];
    setActiveTab(currentPath);

    // Fetch the student name from localStorage
    const name = localStorage.getItem("studentName") || "Default Name";
    setStudentName(name);
  }, [location.pathname]);

  const routes = [
    { id: "dashboard", name: "Individual Performance" },
    { id: "learning-resources", name: "Learning Resources" },
  ];

  const handleNavigation = (id) => {
    setActiveTab(id);
    navigate(`/student/${id}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token from localStorage
    localStorage.removeItem("studentName"); // Remove the student name from localStorage
    navigate("/student/login"); // Redirect to the login page
  };

  return (
    <div className="container p-4 mx-auto">
      {/* ADMIN ICON */}
      <div className="mb-4 flex justify-between">
        <div>
          <FaRegUserCircle size={30} />
          <p>{studentName}</p>
        </div>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>
      {/* NAVIGATION */}
      <div className="space-x-4">
        {routes.map((route) => (
          <button
            key={route.id}
            onClick={() => handleNavigation(route.id)}
            className={
              activeTab === route.id
                ? "text-[#D25D09] font-semibold transition-colors"
                : ""
            }
          >
            {route.name}
          </button>
        ))}
      </div>
      {/* CONTENT */}
      {activeTab === "dashboard" && (
        <>
          {/* DASHBOARD */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2 mb-4 mt-4">
            <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
              <span className="ml-2 font-semibold">Predicted Grade</span>
              <div className="flex justify-end">
                <p className="text-5xl font-semibold">54%</p>
              </div>
            </div>
            <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
              <span className="ml-2 font-semibold">Actual Grade</span>
              <div className="flex justify-end">
                <p className="text-5xl font-semibold">72.43%</p>
              </div>
            </div>
            <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
              <span className="ml-2 font-semibold">Attendance Rate</span>
              <div className="flex justify-end">
                <p className="text-5xl font-semibold">80%</p>
              </div>
            </div>
            <div className="border p-2 rounded shadow-lg flex flex-col justify-around">
              <span className="ml-2 font-semibold">Risk Indicator</span>
              <div className="flex justify-end">
                <div className="w-full bg-gray-200 relative">
                  <div
                    className="h-8"
                    style={{
                      width: "100%",
                      background:
                        "linear-gradient(to right, green 80%, red 20%)",
                    }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
          {/* CHART */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="border p-4 rounded shadow-lg">
              <h2 className="text-center mb-4">Performance Over Time</h2>
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
          </div>
        </>
      )}
      {activeTab === "learning-resources" && (
        <StudentLearningResource studentName={studentName} />
      )}
    </div>
  );
};

export default StudentDashboard;

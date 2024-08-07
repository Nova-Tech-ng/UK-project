import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import StudentLearningResource from "./StudentLearningResource";
import { useNavigate } from "react-router";
import StudentDataTable from "./StudentDataTable";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Individual Performance");
  const [student, setStudent] = useState(null);
  const [showLogout, setShowLogout] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedStudent = localStorage.getItem("studentData");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    } else {
      navigate("/student/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    localStorage.removeItem("courses");
    navigate("/student/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-2xl font-bold">
          Welcome, {student ? student.first_name : "Student"}!
        </h2>
        <div className="relative">
          <FaRegUserCircle
            size={32}
            className="cursor-pointer"
            onClick={() => setShowLogout(!showLogout)}
          />
          {showLogout && (
            <button
              className="absolute right-0 mt-2 w-32 bg-white border border-gray-300 shadow-lg rounded-lg py-2"
              onClick={handleLogout}
            >
              Logout
            </button>
          )}
        </div>
      </div>
      <div className="mb-4">
        <ul className="flex">
          <li
            className={`mr-4 cursor-pointer ${
              activeTab === "Individual Performance"
                ? "text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Individual Performance")}
          >
            Individual Performance
          </li>
          <li
            className={`mr-4 cursor-pointer ${
              activeTab === "Learning Resources"
                ? "text-blue-500"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("Learning Resources")}
          >
            Learning Resources
          </li>
        </ul>
      </div>
      {activeTab === "Individual Performance" && (
        <div>
          <StudentDataTable />
        </div>
      )}
      {activeTab === "Learning Resources" && <StudentLearningResource />}
    </div>
  );
};

export default StudentDashboard;

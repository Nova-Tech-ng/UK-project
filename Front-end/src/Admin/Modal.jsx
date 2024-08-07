import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Modal = ({ isOpen, onClose, student }) => {
  if (!isOpen || !student) return null;
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPredictions = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Redirecting to login...");
          navigate("/admin/login");
          return;
        }

        const response = await axios.get(
          "https://amaremoelaebi.pythonanywhere.com/api/admin/students/predictions",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formattedData = Object.keys(response.data).map((key) => ({
          student_name: response.data[key].student_name,
          previous_grades: response.data[key].actual_grades,
          predicted_grades: response.data[key].predicted_grades,
        }));

        const filteredData = formattedData.filter(
          (item) =>
            item.student_name === `${student.first_name} ${student.last_name}`
        );

        setStudentData(filteredData);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [navigate, student]);

  const getRiskStatus = (studentData) => {
    if (studentData.length === 0) return "No data available";
    const riskStatuses = studentData.map((data) => {
      return Object.values(data.predicted_grades).some((grades) =>
        grades.some((grade) => grade.risk_factor === "At risk")
      )
        ? "At risk"
        : "Not at risk";
    });
    return riskStatuses.includes("At risk") ? "At risk" : "Not at risk";
  };

  const riskStatus = getRiskStatus(studentData);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 sm:p-6 md:p-8">
      <div className="bg-white p-4 sm:p-6 md:p-8 rounded-lg shadow-lg w-full max-w-3xl md:max-w-4xl lg:max-w-5xl h-3/4 md:h-4/5 lg:h-3/4 overflow-auto relative">
        <div className="flex justify-between mb-8">
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-semibold">
            {student.first_name} {student.last_name}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
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
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="flex flex-col sm:flex-row items-center mb-4">
          <span className="text-lg sm:text-xl lg:text-2xl font-semibold">
            {student.id}
          </span>
          <span
            className={`${
              riskStatus === "At risk"
                ? "ml-0 sm:ml-auto text-red-500 text-lg sm:text-xl lg:text-2xl font-semibold"
                : "ml-0 sm:ml-auto text-green-500 text-lg sm:text-xl lg:text-2xl font-semibold"
            }`}
          >
            <p className="text-black">Status:</p> {riskStatus}
          </span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-[#EAF1EF] text-left">
                <th className="px-4 py-2 border">Student Name</th>
                <th className="px-4 py-2 border">Previous Grades</th>
                <th className="px-4 py-2 border">Predicted Grades</th>
              </tr>
            </thead>
            <tbody>
              {studentData.map((student, index) => (
                <tr key={index}>
                  <td className="border px-4 py-2">{student.student_name}</td>
                  <td className="border px-4 py-2">
                    {Object.entries(student.previous_grades).map(
                      ([subject, grade]) => (
                        <div key={subject}>
                          {subject}: {grade}
                        </div>
                      )
                    )}
                  </td>
                  <td className="border px-4 py-2">
                    {Object.entries(student.predicted_grades).map(
                      ([subject, grades]) => (
                        <div key={subject}>
                          {subject}:{" "}
                          {grades.map((grade, index) => (
                            <div key={index}>
                              {grade.predicted_grade} (Risk: {grade.risk_factor}
                              )
                            </div>
                          ))}
                        </div>
                      )
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Modal;

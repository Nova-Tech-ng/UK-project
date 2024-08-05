import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Modal from "./Modal";

const StudentList = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentData, setStudentData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Redirecting to login...");
          navigate("/admin/login");
          return;
        }

        const response = await axios.get(
          "https://amaremoelaebi.pythonanywhere.com//api/admin/students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const students = response.data.map((student) => ({
          id: student.id,
          first_name: student.first_name,
          last_name: student.last_name,
          username: student.username,
          email: student.email,
        }));

        setStudentData(students);
      } catch (error) {
        console.error("Error fetching students:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStudents();
  }, [navigate]);

  const handleRowClick = (student) => {
    setSelectedStudent(student);
    setModalOpen(true);
  };

  // const handleBack = () => {
  //   navigate("/admin/dashboard");
  // };

  return (
    <div className="container mx-auto p-4">
      {/* <button
        onClick={handleBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Back to Dashboard
      </button> */}
      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Academic Details of Students</h2>
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p className="text-red-500">{error}</p>
          ) : (
            <table className="min-w-full table-auto">
              <thead>
                <tr className="bg-[#EAF1EF]">
                  <th className="px-4 py-2 border">Student ID</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Username</th>
                  <th className="px-4 py-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {studentData.map((student) => (
                  <tr
                    key={student.id}
                    className="cursor-pointer"
                    onClick={() => handleRowClick(student)}
                  >
                    <td className="border px-4 py-2">{student.id}</td>
                    <td className="border px-4 py-2">{student.first_name}</td>
                    <td className="border px-4 py-2">{student.last_name}</td>
                    <td className="border px-4 py-2">{student.username}</td>
                    <td className="border px-4 py-2">{student.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {isModalOpen && selectedStudent && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setModalOpen(false)}
          student={selectedStudent}
        />
      )}
    </div>
  );
};

export default StudentList;

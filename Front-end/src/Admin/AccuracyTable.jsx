import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AccuracyTable = () => {
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

        localStorage.setItem("predictions", JSON.stringify(response.data));
        const formattedData = Object.keys(response.data).map((key, index) => ({
          id: index + 1,
          student_name: response.data[key].student_name,
          actual_grades: response.data[key].actual_grades,
          predicted_grades: response.data[key].predicted_grades,
        }));

        setStudentData(formattedData);
      } catch (error) {
        console.error("Error fetching predictions:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPredictions();
  }, [navigate]);

  return (
    <div className="border p-4 rounded shadow-lg">
      <h2 className="text-center mb-4">Accuracy of Trained Model</h2>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <table className="w-full table-auto">
          <thead>
            <tr className="bg-[#EAF1EF] text-left">
              <th className="px-4 py-2 border">Student Name</th>
              <th className="px-4 py-2 border">Actual Grades</th>
              <th className="px-4 py-2 border">Predicted Grades</th>
            </tr>
          </thead>
          <tbody>
            {studentData.map((student) => (
              <tr key={student.id}>
                <td className="border px-4 py-2">{student.student_name}</td>
                <td className="border px-4 py-2">
                  {Object.entries(student.actual_grades).map(
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
                            {grade.predicted_grade} (Risk: {grade.risk_factor})
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
      )}
    </div>
  );
};

export default AccuracyTable;

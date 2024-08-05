import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentDetails = ({ student }) => {
  const [predictions, setPredictions] = useState([]);
  const [error, setError] = useState(null);
  const [loadingPredictions, setLoadingPredictions] = useState(false);

  const fetchPredictions = async (studentId, courseName) => {
    setLoadingPredictions(true);
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await axios.get(
        `https://amaremoelaebi.pythonanywhere.com//api/admin/student/${studentId}/predictions/${courseName}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPredictions(response.data.predictions);
    } catch (error) {
      console.error("Error fetching predictions:", error);
      setError(error.message);
    } finally {
      setLoadingPredictions(false);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex flex-col items-center mb-4">
        <h2 className="text-2xl font-bold mb-2">
          {student.first_name} {student.last_name}
        </h2>
        <p className="mb-1">
          <strong>Username:</strong> {student.username}
        </p>
        <p className="mb-1">
          <strong>Email:</strong> {student.email}
        </p>
      </div>
      <div className="border p-4 rounded shadow-lg mb-4">
        <h3 className="text-xl font-semibold mb-2">Course Data</h3>
        <table className="w-full table-auto">
          <thead>
            <tr>
              <th className="px-4 py-2">Course Name</th>
              <th className="px-4 py-2">Course Code</th>
              <th className="px-4 py-2">Course Unit</th>
              <th className="px-4 py-2">Test Score</th>
              <th className="px-4 py-2">Exam Score</th>
              <th className="px-4 py-2">Predictions</th>
            </tr>
          </thead>
          <tbody>
            {student.courses.map((course) => (
              <tr key={course.id}>
                <td className="border px-4 py-2">{course.course_name}</td>
                <td className="border px-4 py-2">{course.course_code}</td>
                <td className="border px-4 py-2">{course.course_unit}</td>
                <td className="border px-4 py-2">{course.test_score}</td>
                <td className="border px-4 py-2">{course.exam_score}</td>
                <td className="border px-4 py-2">
                  <button
                    onClick={() =>
                      fetchPredictions(student.id, course.course_name)
                    }
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                  >
                    {loadingPredictions ? "Loading..." : "View Predictions"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {predictions.length > 0 && (
        <div className="border p-4 rounded shadow-lg">
          <h3 className="text-xl font-semibold mb-2">Predictions</h3>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2">Course Name</th>
                <th className="px-4 py-2">Decision Tree Class</th>
                <th className="px-4 py-2">Decision Tree Probability</th>
                <th className="px-4 py-2">Linear Regression Prediction</th>
                <th className="px-4 py-2">Risk Factor</th>
              </tr>
            </thead>
            <tbody>
              {predictions.map((prediction) => (
                <tr key={prediction.id}>
                  <td className="border px-4 py-2">{prediction.course_name}</td>
                  <td className="border px-4 py-2">
                    {prediction.decision_tree_pred_class}
                  </td>
                  <td className="border px-4 py-2">
                    {prediction.decision_tree_pred_prob.join(", ")}
                  </td>
                  <td className="border px-4 py-2">
                    {prediction.linear_regression_pred}
                  </td>
                  <td className="border px-4 py-2">{prediction.risk_factor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {error && <div className="text-red-500">Error: {error}</div>}
    </div>
  );
};

export default StudentDetails;

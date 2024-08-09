import { useState, useEffect } from "react";
import axios from "axios";
import AddNewCourse from "./AddNewCourse";

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token") || "your_default_token";
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    try {
      const response = await axios.get(
        "https://amaremoelaebi.pythonanywhere.com/api/student/datas",
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );
      setCourses(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handlePrediction = async (courseName) => {
    setIsLoading(true);
    setError(null);
    setMessage(null);
    setPrediction(null);
    try {
      const response = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/student/create/prediction",
        { course_name: courseName },
        {
          headers: {
            Authorization: `Bearer ${getToken()}`,
          },
        }
      );

      if (
        response.data.message === "Prediction for this course already exists"
      ) {
        setMessage("Prediction already exists");
        setPrediction(response.data.existing_prediction);
      } else {
        setMessage("Prediction successful");
        setPrediction(response.data.prediction);
      }
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 400) {
      const errorResponse = error.response.data;
      const existingPrediction = errorResponse.existing_prediction || {};
      setMessage(errorResponse.message);
      setPrediction(existingPrediction);
    } else {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <div className="course-detail p-4 sm:p-6 bg-gray-50">
      <h2 className="text-lg sm:text-2xl font-bold mb-4">Course Detail</h2>
      <AddNewCourse addCourse={handleAddCourse} />
      {isLoading && <p className="text-gray-500">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!isLoading && !error && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-200 text-left">
                <th className="py-2 px-2 sm:px-4 border-b">Course Name</th>
                <th className="py-2 px-2 sm:px-4 border-b">Course ID</th>
                <th className="py-2 px-2 sm:px-4 border-b">Prior Knowledge</th>
                <th className="py-2 px-2 sm:px-4 border-b">Difficulty</th>
                <th className="py-2 px-2 sm:px-4 border-b">Course Workload</th>
                <th className="py-2 px-2 sm:px-4 border-b">Season</th>
                <th className="py-2 px-2 sm:px-4 border-b">Previous Grade</th>
                <th className="py-2 px-2 sm:px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course) => (
                <tr key={course.id} className="hover:bg-gray-100">
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.course_name}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.course_id}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.prior_knowledge}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.course_difficulty}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.course_work_load}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.time_of_year}
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    {course.past_grades}%
                  </td>
                  <td className="py-2 px-2 sm:px-4 border-b">
                    <button
                      className="bg-blue-500 text-white px-3 py-2 sm:px-4 sm:py-2 rounded"
                      onClick={() => handlePrediction(course.course_name)}
                    >
                      Get Prediction
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {message && (
        <div
          className={`mt-4 p-4 ${
            message === "Prediction successful"
              ? "bg-green-100 text-green-800"
              : "bg-yellow-100 text-yellow-800"
          } rounded`}
        >
          <h3 className="text-lg font-semibold">{message}</h3>
          {prediction && (
            <div className="mt-2">
              <p>
                <strong>Course Name:</strong> {prediction["course name"]}
              </p>
              <p>
                <strong>Predicted Grade:</strong>{" "}
                {prediction["predicted grade"]}
              </p>
              <p>
                <strong>Risk Factor:</strong> {prediction["risk factor"]}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CourseTable;

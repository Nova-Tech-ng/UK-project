import { useState, useEffect } from "react";
import axios from "axios";
import AddNewCourse from "./AddNewCourse";

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorData, setErrorData] = useState(null);

  const getToken = () => {
    return localStorage.getItem("token") || "your_default_token";
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setIsLoading(true);
    setError(null);
    setErrorData(null);
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
    setErrorData(null);
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
      setPrediction(response.data.prediction);
    } catch (error) {
      handleError(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleError = (error) => {
    if (error.response && error.response.status === 400) {
      setErrorData(error.response.data);
    } else {
      console.error("Error:", error);
      setError("An error occurred. Please try again.");
    }
  };

  const handleAddCourse = (newCourse) => {
    setCourses([...courses, newCourse]);
  };

  return (
    <div className="course-detail p-4">
      <AddNewCourse addCourse={handleAddCourse} />
      {isLoading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {errorData && (
        <div className="bg-red-100 text-red-700 p-4 rounded mb-4">
          <h3 className="font-semibold mb-2">You already have a prediction</h3>
          <pre>{JSON.stringify(errorData, null, 2)}</pre>
        </div>
      )}
      {!isLoading && !error && !errorData && (
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b">Course Name</th>
              <th className="py-2 px-4 border-b">Course ID</th>
              <th className="py-2 px-4 border-b">Prior Knowledge</th>
              <th className="py-2 px-4 border-b">Difficulty</th>
              <th className="py-2 px-4 border-b">Course Workload</th>
              <th className="py-2 px-4 border-b">Season</th>
              <th className="py-2 px-4 border-b">Previous Grade</th>
              <th className="py-2 px-4 border-b">Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id} className="hover:bg-gray-100">
                <td className="py-2 px-4 border-b">{course.course_name}</td>
                <td className="py-2 px-4 border-b">{course.course_id}</td>
                <td className="py-2 px-4 border-b">{course.prior_knowledge}</td>
                <td className="py-2 px-4 border-b">
                  {course.course_difficulty}
                </td>
                <td className="py-2 px-4 border-b">
                  {course.course_work_load}
                </td>
                <td className="py-2 px-4 border-b">{course.time_of_year}</td>
                <td className="py-2 px-4 border-b">{course.past_grades}%</td>
                <td className="py-2 px-4 border-b">
                  <div className="flex justify-between space-x-4">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
                      onClick={() => handlePrediction(course.course_name)}
                    >
                      Get Prediction
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {prediction && (
        <div className="prediction mt-4 p-4 bg-blue-100 rounded">
          <h3 className="font-semibold">Prediction</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default CourseTable;

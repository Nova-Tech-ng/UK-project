import { useState, useEffect } from "react";
import axios from "axios";

const CourseTable = () => {
  const [courses, setCourses] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errorData, setErrorData] = useState(null);

  // this just for demo purposes
  const getToken = () => {
    return (
      localStorage.getItem("token") ||
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTcyMjk1MjQwNiwianRpIjoiYTRiZTkzMTgtMzVlMC00YjE2LWExYWItZTY5ZmIwY2I1NzQwIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IjM3MzNjNTBlLTY3MGEtNGY4Ni1hNTAzLWE1ZmY3YmM4MmM0MCIsIm5iZiI6MTcyMjk1MjQwNiwiY3NyZiI6IjFmZTQ2M2Q2LTVkYzgtNDU1OS05ZDAxLTBlMDcwMTRjNjRiMSIsImV4cCI6MTcyMzM4NDQwNn0.EOTr3SxlL5CuAgbmImNoRksmJP8BFNgyLa6_9YVCrWU"
    );
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

  return (
    <div className="course-detail">
      <h2>Course Detail</h2>
      <button className="add-course">Add Course</button>
      {isLoading && <p>Loading...</p>}
      {error && <p className="error">{error}</p>}
      {errorData && (
        <div className="error-data">
          <h3>You already have a prediction</h3>
          <pre>{JSON.stringify(errorData, null, 2)}</pre>
        </div>
      )}
      {!isLoading && !error && !errorData && (
        <table>
          <thead>
            <tr>
              <th>Course Name</th>
              <th>Course ID</th>
              <th>Prior Knowledge</th>
              <th>Difficulty</th>
              <th>Course Workload</th>
              <th>Season</th>
              <th>Previous Grade</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course.id}>
                <td>{course.course_name}</td>
                <td>{course.course_id}</td>
                <td>{course.prior_knowledge}</td>
                <td>{course.course_difficulty}</td>
                <td>{course.course_work_load}</td>
                <td>{course.time_of_year}</td>
                <td>{course.past_grades}%</td>
                <td>
                  <button onClick={() => handlePrediction(course.course_name)}>
                    Get Prediction
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {prediction && (
        <div className="prediction">
          <h3>Prediction</h3>
          <p>{prediction}</p>
        </div>
      )}
    </div>
  );
};

export default CourseTable;

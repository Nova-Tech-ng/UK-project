import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaRegUserCircle } from "react-icons/fa";
import StudentLearningResource from "./StudentLearningResource";
import { useNavigate } from "react-router";

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState("Individual Performance");
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");
  const [predictions, setPredictions] = useState(null);
  const [courses, setCourses] = useState([]);
  const [student, setStudent] = useState(null);
  const [showLogout, setShowLogout] = useState(false);
  const [newCourse, setNewCourse] = useState({
    age: "",
    grade_level: "",
    learning_style: "",
    socio_economic_status: "",
    past_grades: "",
    standardized_test_scores: "",
    prior_knowledge: "",
    course_id: "",
    course_name: "",
    course_difficulty: "",
    class_size: "",
    teaching_style: "",
    course_work_load: "",
    attendance: "",
    study_time: "",
    time_of_year: "",
    extra_curricular_activities: "",
    health: "",
    home_environment: "",
    actual_grade: "",
    cgpa: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const storedCourses = JSON.parse(localStorage.getItem("courses")) || [];
    setCourses(storedCourses);

    const storedStudent = localStorage.getItem("studentData");
    if (storedStudent) {
      setStudent(JSON.parse(storedStudent));
    } else {
      navigate("/student/login");
    }
  }, [navigate]);

  const fetchPrediction = async (course) => {
    try {
      const requestData = {
        age: course.age,
        grade_level: course.grade_level,
        learning_style: course.learning_style,
        socio_economic_status: course.socio_economic_status,
        past_grades: course.past_grades,
        standardized_test_scores: course.standardized_test_scores,
        prior_knowledge: course.prior_knowledge,
        course_id: course.course_id,
        course_name: course.course_name,
        course_difficulty: course.course_difficulty,
        class_size: course.class_size,
        teaching_style: course.teaching_style,
        course_work_load: course.course_work_load,
        attendance: course.attendance,
        study_time: course.study_time,
        time_of_year: course.time_of_year,
        extra_curricular_activities: course.extra_curricular_activities,
        health: course.health,
        home_environment: course.home_environment,
        actual_grade: course.actual_grade,
        cgpa: course.cgpa,
      };
      console.log("Request Data:", requestData);

      const response = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/student/create/prediction",
        requestData,
        { headers: { Authorization: "Bearer access-token" } }
      );

      console.log("Response Data:", response.data);
      setPredictions(response.data.stored_prediction);
      setModalType("prediction");
      setShowModal(true);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      alert("Failed to fetch prediction. Please try again later.");
    }
  };

  const addCourse = (newCourse) => {
    const updatedCourses = [...courses, newCourse];
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
    setShowModal(false);
  };

  const deleteCourse = (courseIndex) => {
    const updatedCourses = courses.filter((_, index) => index !== courseIndex);
    setCourses(updatedCourses);
    localStorage.setItem("courses", JSON.stringify(updatedCourses));
  };

  const renderPredictionModal = () => {
    if (!predictions) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded shadow-lg">
          <h2 className="text-2xl font-bold mb-4">Prediction Results</h2>
          <div className="mb-4">
            <p className="text-lg">
              <strong>Prediction:</strong> {predictions.prediction}
            </p>
          </div>
          <button
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  const renderAddCourseModal = () => {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 overflow-y-auto">
        <div className="bg-white p-8 rounded shadow-lg max-w-5xl w-full mx-4 sm:mx-6 lg:mx-8">
          <h2 className="text-2xl font-bold mb-4">Add New Course</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addCourse(newCourse);
            }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-4">
              {Object.keys(newCourse).map((key) => (
                <div className="mb-4" key={key}>
                  <label
                    className="block text-gray-700 text-sm font-bold mb-2"
                    htmlFor={key}
                  >
                    {key
                      .replace(/_/g, " ")
                      .replace(/^\w/, (c) => c.toUpperCase())}
                  </label>
                  <input
                    type="text"
                    id={key}
                    value={newCourse[key]}
                    onChange={(e) =>
                      setNewCourse({ ...newCourse, [key]: e.target.value })
                    }
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              ))}
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Add Course
              </button>
              <button
                type="button"
                className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("studentData");
    localStorage.removeItem("courses");
    navigate("/student/login");
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center border-b pb-2 mb-4">
        <h2 className="text-2xl font-bold">
          Welcome, {student?.first_name || "Student"}!
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
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-bold">Courses</h3>
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                setNewCourse({
                  age: "",
                  grade_level: "",
                  learning_style: "",
                  socio_economic_status: "",
                  past_grades: "",
                  standardized_test_scores: "",
                  prior_knowledge: "",
                  course_id: "",
                  course_name: "",
                  course_difficulty: "",
                  class_size: "",
                  teaching_style: "",
                  course_work_load: "",
                  attendance: "",
                  study_time: "",
                  time_of_year: "",
                  extra_curricular_activities: "",
                  health: "",
                  home_environment: "",
                  actual_grade: "",
                  cgpa: "",
                });
                setModalType("addCourse");
                setShowModal(true);
              }}
            >
              Add Course
            </button>
          </div>
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Course Name</th>
                <th className="py-2 px-4 border-b">Grade Level</th>
                <th className="py-2 px-4 border-b">Difficulty</th>
                <th className="py-2 px-4 border-b">Attendance</th>
                <th className="py-2 px-4 border-b">Study Time</th>
                <th className="py-2 px-4 border-b">Prediction</th>
                <th className="py-2 px-4 border-b">Actions</th>
              </tr>
            </thead>
            <tbody>
              {courses.map((course, index) => (
                <tr key={index}>
                  <td className="py-2 px-4 border-b">{course.course_name}</td>
                  <td className="py-2 px-4 border-b">{course.grade_level}</td>
                  <td className="py-2 px-4 border-b">
                    {course.course_difficulty}
                  </td>
                  <td className="py-2 px-4 border-b">{course.attendance}</td>
                  <td className="py-2 px-4 border-b">{course.study_time}</td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => fetchPrediction(course)}
                    >
                      Predict
                    </button>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded"
                      onClick={() => deleteCourse(index)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "Learning Resources" && <StudentLearningResource />}
      {showModal && modalType === "prediction" && renderPredictionModal()}
      {showModal && modalType === "addCourse" && renderAddCourseModal()}
    </div>
  );
};

export default StudentDashboard;

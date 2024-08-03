import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dataentrypage from "../assets/dataentrypage.svg";

const DataEntryPage = () => {
  const [formData, setFormData] = useState({
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

  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const validateForm = () => {
    for (let key in formData) {
      if (formData[key] === "") {
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      setMessage("Please fill in all fields.");
      return;
    }

    try {
      const token = localStorage.getItem("token"); // Assuming you store the token in localStorage
      const response = await axios.post("/api/student/data", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage("Data entry successful!");
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 2000); // Redirect after 2 seconds
    } catch (error) {
      console.error("Error submitting data:", error);
      if (error.response && error.response.data) {
        console.error("Server response:", error.response.data);
        setMessage(
          `Error: ${
            error.response.data.message ||
            "Please check your inputs and try again."
          }`
        );
      } else {
        setMessage(
          "Error submitting data. Please check your inputs and try again."
        );
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 p-4">
      <div className="p-8 rounded-lg w-full max-w-2xl ">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Hello Mark Jacob
        </h2>
        <p className="text-center mb-6">Please enter your details</p>
        {message && (
          <div className="mb-4 text-center text-red-500">{message}</div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {/* AGE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="age"
              >
                Age
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="age"
                type="number"
                placeholder="20"
                value={formData.age}
                onChange={handleChange}
              />
            </div>
            {/* GRADE LEVEL */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="grade_level"
              >
                Grade Level
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="grade_level"
                type="text"
                placeholder="Sophomore"
                value={formData.grade_level}
                onChange={handleChange}
              />
            </div>
            {/* LEARNING STYLE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="learning_style"
              >
                Learning Style
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="learning_style"
                type="text"
                placeholder="Visual"
                value={formData.learning_style}
                onChange={handleChange}
              />
            </div>
            {/* SOCIO-ECONOMIC STATUS */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="socio_economic_status"
              >
                Socio-Economic Status
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="socio_economic_status"
                type="text"
                placeholder="Middle"
                value={formData.socio_economic_status}
                onChange={handleChange}
              />
            </div>
            {/* PAST GRADE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="past_grades"
              >
                Past Grade
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="past_grades"
                type="text"
                placeholder="B"
                value={formData.past_grades}
                onChange={handleChange}
              />
            </div>
            {/* STANDARDIZED TEST SCORES */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="standardized_test_scores"
              >
                Standardized Test Scores
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="standardized_test_scores"
                type="number"
                placeholder="1200"
                value={formData.standardized_test_scores}
                onChange={handleChange}
              />
            </div>
            {/* PRIOR KNOWLEDGE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="prior_knowledge"
              >
                Prior Knowledge
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="prior_knowledge"
                type="text"
                placeholder="Intermediate"
                value={formData.prior_knowledge}
                onChange={handleChange}
              />
            </div>
            {/* COURSE ID */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="course_id"
              >
                Course Id
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="course_id"
                type="text"
                placeholder="CS101"
                value={formData.course_id}
                onChange={handleChange}
              />
            </div>
            {/* COURSE NAME */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="course_name"
              >
                Course Name
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="course_name"
                type="text"
                placeholder="Introduction to Computer Science"
                value={formData.course_name}
                onChange={handleChange}
              />
            </div>
            {/* COURSE DIFFICULTY */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="course_difficulty"
              >
                Course Difficulty
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="course_difficulty"
                type="text"
                placeholder="Moderate"
                value={formData.course_difficulty}
                onChange={handleChange}
              />
            </div>
            {/* CLASS SIZE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="class_size"
              >
                Class Size
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="class_size"
                type="number"
                placeholder="30"
                value={formData.class_size}
                onChange={handleChange}
              />
            </div>
            {/* TEACHING STYLE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="teaching_style"
              >
                Teaching Style
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="teaching_style"
                type="text"
                placeholder="Lecture"
                value={formData.teaching_style}
                onChange={handleChange}
              />
            </div>
            {/* COURSE WORKLOAD */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="course_work_load"
              >
                Course Work Load
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="course_work_load"
                type="text"
                placeholder="Medium"
                value={formData.course_work_load}
                onChange={handleChange}
              />
            </div>
            {/* ATTENDANCE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="attendance"
              >
                Attendance
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="attendance"
                type="number"
                placeholder="90"
                value={formData.attendance}
                onChange={handleChange}
              />
            </div>
            {/* STUDY TIME */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="study_time"
              >
                Study Time
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="study_time"
                type="number"
                placeholder="10"
                value={formData.study_time}
                onChange={handleChange}
              />
            </div>
            {/* TIME OF YEAR */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="time_of_year"
              >
                Time of Year
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="time_of_year"
                type="text"
                placeholder="Fall"
                value={formData.time_of_year}
                onChange={handleChange}
              />
            </div>
            {/* EXTRA CURRICULAR ACTIVITIES */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="extra_curricular_activities"
              >
                Extra Curricular Activities
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="extra_curricular_activities"
                type="text"
                placeholder="Chess Club"
                value={formData.extra_curricular_activities}
                onChange={handleChange}
              />
            </div>
            {/* HEALTH */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="health"
              >
                Health
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="health"
                type="text"
                placeholder="Good"
                value={formData.health}
                onChange={handleChange}
              />
            </div>
            {/* HOME ENVIRONMENT */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="home_environment"
              >
                Home Environment
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="home_environment"
                type="text"
                placeholder="Supportive"
                value={formData.home_environment}
                onChange={handleChange}
              />
            </div>
            {/* ACTUAL GRADE */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="actual_grade"
              >
                Actual Grade
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="actual_grade"
                type="text"
                placeholder="A"
                value={formData.actual_grade}
                onChange={handleChange}
              />
            </div>
            {/* CGPA */}
            <div className="mb-4">
              <label
                className="block text-gray-700 text-sm font-bold mb-2"
                htmlFor="cgpa"
              >
                CGPA
              </label>
              <input
                className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                id="cgpa"
                type="number"
                step="0.1"
                placeholder="3.5"
                value={formData.cgpa}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex items-center justify-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="w-full max-w-md">
        <img
          src={dataentrypage}
          alt="Data Entry Illustration"
          className="w-full h-auto"
        />
      </div>
    </div>
  );
};

export default DataEntryPage;

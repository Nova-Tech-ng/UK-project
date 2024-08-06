import React, { useState, useEffect } from "react";
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
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      setToken(storedToken);
    } else {
      setMessage("Authorization token is missing.");
    }
  }, []);

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
    setMessage("");
    setSuccessMessage("");

    if (!validateForm()) {
      setMessage("Please fill in all fields.");
      return;
    }

    if (!token) {
      setMessage("Authorization token is missing.");
      return;
    }

    try {
      const response = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/student/data",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const predictionResponse = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/student/create/prediction",
        { course_name: formData.course_name },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Save formData to local storage
      const courses = JSON.parse(localStorage.getItem("courses")) || [];
      courses.push(formData);
      localStorage.setItem("courses", JSON.stringify(courses));

      setSuccessMessage("Data entry and prediction successful!");
      setTimeout(() => {
        navigate("/student/dashboard");
      }, 2000);
    } catch (error) {
      if (error.response && error.response.data) {
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
      <div className="p-8 rounded-lg w-full max-w-2xl">
        <h2 className="text-3xl font-bold mb-6 text-center">
          Hello Mark Jacob
        </h2>
        <p className="text-center mb-6">Please enter your details</p>
        {message && (
          <div className="mb-4 text-center text-red-500">{message}</div>
        )}
        {successMessage && (
          <div className="mb-4 text-center text-green-500">
            {successMessage}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {Object.keys(formData).map((key) => (
              <div className="mb-4" key={key}>
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor={key}
                >
                  {key
                    .replace(/_/g, " ")
                    .replace(/\b\w/g, (l) => l.toUpperCase())}
                </label>
                <input
                  className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:outline"
                  id={key}
                  type={
                    key === "age" ||
                    key === "past_grades" ||
                    key === "standardized_test_scores" ||
                    key === "course_id" ||
                    key === "class_size" ||
                    key === "attendance" ||
                    key === "study_time" ||
                    key === "cgpa"
                      ? "number"
                      : "text"
                  }
                  placeholder={getPlaceholder(key)}
                  value={formData[key]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
          <div className="text-center">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="mt-8 md:mt-0 md:ml-8">
        <img
          src={dataentrypage}
          alt="Data Entry Illustration"
          className="max-w-full h-auto"
        />
      </div>
    </div>
  );
};

const getPlaceholder = (key) => {
  const placeholders = {
    age: "19",
    grade_level: "Sophomore",
    learning_style: "visual",
    socio_economic_status: "middle income",
    past_grades: "85.6",
    standardized_test_scores: "1050",
    prior_knowledge: "Biology",
    course_id: "102",
    course_name: "PHE",
    course_difficulty: "hard",
    class_size: "35",
    teaching_style: "interactive",
    course_work_load: "Exams, Project",
    attendance: "92",
    study_time: "10",
    time_of_year: "Fall semester",
    extra_curricular_activities: "yes",
    health: "good",
    home_environment: "quiet",
    actual_grade: "B",
    cgpa: "4",
  };

  return placeholders[key] || "";
};

export default DataEntryPage;

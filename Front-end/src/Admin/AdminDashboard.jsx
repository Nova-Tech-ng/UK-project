import React, { useState, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import studentgraduate from "../assets/studentgraduate.svg";
import StudentList from "./StudentList";
import Chart from "./Chart";
import Modal from "./Modal";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = useState([]);
  const [totalStudents, setTotalStudents] = useState(0);
  const [selectedCourse, setSelectedCourse] = useState("All");
  const [chartData, setChartData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoursesAndStudents = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Redirecting to login...");
          navigate("/admin/login");
          return;
        }

        const response = await axios.get(
          "https://amaremoelaebi.pythonanywhere.com/api/admin/courses-and-students",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { courses, total_students } = response.data;
        setCourses(courses);
        setTotalStudents(total_students);

        // Store data in localStorage
        localStorage.setItem("courses", JSON.stringify(courses));
        localStorage.setItem("total_students", total_students);
      } catch (error) {
        console.error("Error fetching courses and students:", error);
        setError(error.message);
      }
    };

    // Check if data exists in localStorage
    const storedCourses = localStorage.getItem("courses");
    const storedTotalStudents = localStorage.getItem("total_students");

    if (storedCourses && storedTotalStudents) {
      setCourses(JSON.parse(storedCourses));
      setTotalStudents(Number(storedTotalStudents));
    } else {
      fetchCoursesAndStudents();
    }
  }, [navigate]);

  useEffect(() => {
    const fetchCoursePredictions = async () => {
      if (selectedCourse === "All") {
        setChartData([]);
        return;
      }

      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Redirecting to login...");
          navigate("/admin/login");
          return;
        }

        const response = await axios.get(
          `https://amaremoelaebi.pythonanywhere.com/api/admin/course-data/${selectedCourse}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const { predictions = [] } = response.data;

        const convertLetterToNumeric = (letterGrade) => {
          switch (letterGrade) {
            case "A":
              return 4.0;
            case "B":
              return 3.0;
            case "C":
              return 2.0;
            case "D":
              return 1.0;
            case "F":
              return 0.0;
            default:
              return NaN;
          }
        };

        const formattedData = predictions.map((prediction) => ({
          year: prediction.year,
          PredictedGrade: convertLetterToNumeric(
            prediction.linear_regression_pred
          ),
          previousGrade: convertLetterToNumeric(prediction.previousGrade),
        }));

        // Calculate average predictions
        const validPredictions = formattedData.filter(
          (data) => !isNaN(data.PredictedGrade) && !isNaN(data.previousGrade)
        );
        const averageData = {
          year: "Average",
          PredictedGrade: (
            validPredictions.reduce((sum, p) => sum + p.PredictedGrade, 0) /
            validPredictions.length
          ).toFixed(2),
          previousGrade: (
            validPredictions.reduce((sum, p) => sum + p.previousGrade, 0) /
            validPredictions.length
          ).toFixed(2),
        };

        setChartData([...formattedData, averageData]);
      } catch (error) {
        console.error("Error fetching course predictions:", error);
        setError(error.message);
      }
    };

    fetchCoursePredictions();
  }, [selectedCourse, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  console.log(chartData);
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between mb-4">
        <div className="flex items-center">
          <FaRegUserCircle size={30} />
          <p className="ml-2">Admin</p>
        </div>
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Logout
        </button>
      </div>

      {error && (
        <div className="bg-red-200 text-red-700 p-4 rounded mb-4">{error}</div>
      )}

      <div className="grid grid-cols-3 mb-4 gap-3">
        <div className="border p-4 rounded shadow-lg">
          <label className="block mb-2 font-semibold">Select Course</label>
          <select
            className="border p-2 w-full"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option>All</option>
            {courses.map((course, index) => (
              <option key={index} value={course}>
                {course}
              </option>
            ))}
          </select>
        </div>
        <div className="border p-4 rounded shadow-lg flex items-center justify-between">
          <img
            src={studentgraduate}
            alt="studentgraduate"
            className="w-12 h-12"
          />
          <div>
            <p className="font-semibold text-right">Students</p>
            <p className="text-3xl font-semibold text-right">{totalStudents}</p>
          </div>
        </div>
        <div className="border p-4 rounded shadow-lg">
          <div>
            <p className="font-semibold">Accuracy of Trained Model</p>
            <p className="text-3xl font-semibold text-right">1</p>
          </div>
        </div>
      </div>

      <div className="">
        <Chart data={chartData} />
      </div>

      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Student Data</h2>
        <StudentList />
      </div>
      <Modal />
    </div>
  );
};

export default AdminDashboard;

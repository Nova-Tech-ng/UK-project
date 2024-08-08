import React, { useState, useEffect } from "react";
import { FaRegUserCircle, FaSpinner } from "react-icons/fa"; // Import FaSpinner
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
  const [loading, setLoading] = useState(false);
  const [averagePredictedGrade, setAveragePredictedGrade] = useState(0);
  const [averagePreviousGrade, setAveragePreviousGrade] = useState(0);

  // Function to map letter grades to numeric values
  const letterGradeToNumeric = (grade) => {
    switch (grade) {
      case "A":
        return 70;
      case "B":
        return 60;
      case "C":
        return 50;
      case "D":
        return 40;
      case "F":
        return 20;
      default:
        return 0;
    }
  };

  // Function to map predicted values to letter grades
  const predictedGradeToLetter = (predictedValue) => {
    if (predictedValue >= 4) {
      return "A";
    } else if (predictedValue >= 3) {
      return "B";
    } else if (predictedValue >= 2) {
      return "C";
    } else if (predictedValue >= 1.5) {
      return "D";
    } else {
      return "F";
    }
  };

  // Function to calculate averages
  const calculateAverages = (data) => {
    if (data.length === 0) {
      setAveragePredictedGrade(0);
      setAveragePreviousGrade(0);
      return;
    }

    const totalPredicted = data.reduce(
      (sum, item) => sum + item.PredictedGrade,
      0
    );
    const totalPrevious = data.reduce(
      (sum, item) => sum + item.previousGrade,
      0
    );

    setAveragePredictedGrade(totalPredicted / data.length);
    setAveragePreviousGrade(totalPrevious / data.length);
  };

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
      setLoading(true);
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Redirecting to login...");
          navigate("/admin/login");
          return;
        }

        if (selectedCourse === "All") {
          let allCourseData = [];

          for (const course of courses) {
            const response = await axios.get(
              `https://amaremoelaebi.pythonanywhere.com/api/admin/course-data/${course}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            const { students = [] } = response.data;
            const formattedData = students.map((student) => ({
              course,
              PredictedGrade: letterGradeToNumeric(
                predictedGradeToLetter(
                  student.predicted_data["linear regression pred"]
                )
              ),
              previousGrade: letterGradeToNumeric(
                student.student_data.actual_grade
              ),
            }));

            allCourseData = [...allCourseData, ...formattedData];
          }

          setChartData(allCourseData);
          calculateAverages(allCourseData);
        } else {
          const response = await axios.get(
            `https://amaremoelaebi.pythonanywhere.com/api/admin/course-data/${selectedCourse}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const { students = [] } = response.data;

          const formattedData = students.map((student) => ({
            course: selectedCourse,
            PredictedGrade: letterGradeToNumeric(
              predictedGradeToLetter(
                student.predicted_data["linear regression pred"]
              )
            ),
            previousGrade: letterGradeToNumeric(
              student.student_data.actual_grade
            ),
          }));

          setChartData(formattedData);
          calculateAverages(formattedData);
        }
      } catch (error) {
        console.error("Error fetching course predictions:", error);
        setError(error.message);
      }
      setLoading(false);
    };

    if (selectedCourse === "All" && courses.length > 0) {
      fetchCoursePredictions();
    } else if (selectedCourse !== "All") {
      fetchCoursePredictions();
    }
  }, [selectedCourse, courses, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

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
            <p className="font-semibold">Average Predicted Grade</p>
            <p className="text-3xl font-semibold text-right">
              {averagePredictedGrade.toFixed(2)}
            </p>
          </div>
          <div>
            <p className="font-semibold">Average Previous Grade</p>
            <p className="text-3xl font-semibold text-right">
              {averagePreviousGrade.toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <FaSpinner className="animate-spin text-4xl text-blue-500" />
        </div>
      ) : (
        <div className="">
          <Chart data={chartData} />
        </div>
      )}

      <div className="border p-4 rounded shadow-lg">
        <h2 className="text-center mb-4">Student Data</h2>
        <StudentList />
      </div>
      <Modal />
    </div>
  );
};

export default AdminDashboard;

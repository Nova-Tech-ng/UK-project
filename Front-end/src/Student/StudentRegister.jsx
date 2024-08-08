import { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import signup from "../assets/signup.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function StudentRegister() {
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    username: "",
    gender: "",
    email: "",
    password: "",
    gender: "", // Added gender field
  });
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordType, setPasswordType] = useState("password");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    setSuccessMessage(""); // Clear any previous success message

    // Check if all fields are filled
    if (
      !formData.first_name ||
      !formData.last_name ||
      !formData.username ||
      !formData.gender ||
      !formData.email ||
      !formData.password ||
      !formData.gender // Check if gender is filled
    ) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    try {
      const response = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/student/register",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const token = response.data.user.access_token; // Ensure this matches the server response
      const user = response.data.user;

      if (token) {
        localStorage.setItem("token", token); // Store the token in localStorage

        // Save student data in local storage
        const studentData = {
          first_name: user.first_name,
          last_name: user.last_name,
          username: user.username,
          email: user.email,
          gender: user.gender, // Assuming you have gender in your response
          predictedGrade: user.predictedGrade, // Assuming you have these fields
          actualGrade: user.actualGrade, // in your response
          attendanceRate: user.attendanceRate,
          performanceData: user.performanceData, // Assuming this is an array of performance over time
        };
        localStorage.setItem("studentData", JSON.stringify(studentData));

        login(token, "student");
        setSuccessMessage("Registration successful!");
        setTimeout(() => {
          navigate("/student/getstudentinfo");
        }, 1000); // Redirect to dashboard after 3 seconds
      } else {
        setErrorMessage("Registration failed. Try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Set error message from backend response
      } else {
        setErrorMessage("Registration failed. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 flex-col-reverse md:flex-row">
      <div>
        <img src={signup} alt="Sign Up" className="w-[500px]" />
      </div>
      <div className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create An Account</h2>

        <form onSubmit={handleSubmit}>
          {/* STUDENT NAME */}
          <div className="mb-4">
            <label
              htmlFor="first_name"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                id="first_name"
                name="first_name"
                placeholder="First Name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.first_name}
                onChange={handleChange}
              />
              <input
                type="text"
                id="last_name"
                name="last_name"
                placeholder="Last Name"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.last_name}
                onChange={handleChange}
              />
            </div>
          </div>
          {/* USER NAME */}
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="User Name"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          {/* gender  */}
          <div className="mb-4">
            <label
              htmlFor="gender"
              className="block text-gray-700 text-sm capitalize font-bold mb-2"
            >
              Gender
            </label>
            <select
              id="gender"
              name="gender"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="others">Others</option>
            </select>
          </div>

          {/* EMAIL */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email address"
              className="w-full border border-gray-300 p-2 rounded"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          {/* PASSWORD */}
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Password
            </label>
            <div className="relative">
              <input
                type={passwordType}
                id="password"
                name="password"
                placeholder="Create Password"
                className="w-full border border-gray-300 p-2 rounded"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="absolute top-0 right-0 m-2"
                onClick={togglePasswordVisibility}
              >
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>

          {errorMessage && (
            <div className="mb-4 text-red-500 text-sm">{errorMessage}</div>
          )}
          {successMessage && (
            <div className="mb-4 text-green-500 text-sm">{successMessage}</div>
          )}
          {/* HAVE AN ACCOUNT? */}
          <div>
            <p className="text-center">
              Have an account?
              <a href="/student/login" className="text-[#0072D8] ml-1">
                Log In
              </a>
            </p>
          </div>
          {/* SUBMIT BUTTON */}
          <div className="text-center">
            <button
              type="submit"
              className="bg-[#D25D09] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default StudentRegister;

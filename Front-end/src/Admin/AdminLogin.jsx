import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext); // Access login function from AuthContext
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear any previous error message
    setSuccessMessage(""); // Clear any previous success message
    try {
      const response = await axios.post(
        "https://amaremoelaebi.pythonanywhere.com/api/admin/login",
        { email, password } // Update the payload according to your API requirements
      );

      const accessToken = response.data.access_token;
      if (accessToken) {
        localStorage.setItem("token", accessToken); // Store the token in localStorage

        login(accessToken, "admin");
        setSuccessMessage("Login successful!");
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 3000); // Redirect to dashboard after 3 seconds
      } else {
        setErrorMessage("Login failed. Try again.");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setErrorMessage(error.response.data.message); // Set error message from backend response
      } else {
        setErrorMessage("Login failed. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  return (
    <div>
      <button className="absolute">
        <a href="/">Back to Home</a>
      </button>
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="p-8 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4">Log in to your dashboard</h2>

          <form onSubmit={handleSubmit}>
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
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 p-2 rounded"
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
                  placeholder="Enter Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-gray-300 p-2 rounded"
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
              <div className="mb-4 text-green-500 text-sm">
                {successMessage}
              </div>
            )}
            {/* FIRST TIME HERE? */}
            <div className="text-center mb-4">
              <p>
                First Time Here?
                <a href="/admin/register" className="text-[#0072D8] ml-1">
                  Sign Up
                </a>
              </p>
            </div>
            {/* BUTTON */}
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;

import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../auth/AuthContext";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const login = useContext(AuthContext); // Destructure login from the AuthContext
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");

  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "https://gregoryalpha.pythonanywhere.com/api/admin/login",
        { email, password }
      );
      login(response.data.token, "admin");
      navigate("/admin/dashboard");
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Admin Login</h2>

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
              placeholder="Email address"
              className="w-full border border-gray-300 p-2 rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                placeholder="Enter Password"
                className="w-full border border-gray-300 p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {/* SHOW/HIDE PASSWORD BUTTON */}
              <button
                type="button"
                className="absolute top-0 right-0 m-2"
                onClick={togglePasswordVisibility}
              >
                {passwordType === "password" ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
          </div>
          {/* FIRST TIME HERE? */}
          <div>
            <p className="text-center">
              First Time Here?
              <a href="/admin/register" className="text-[#0072D8] ml-1">
                Sign Up
              </a>
            </p>
          </div>
          {/* BUTTON */}
          <div className="flex items-center justify-between">
            <button
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;

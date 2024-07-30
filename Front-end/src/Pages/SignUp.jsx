import React, { useState } from "react";
import signup from "../assets/signup.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUpForm() {
  const [passwordType, setPasswordType] = useState("password");
  const [confirmPasswordType, setConfirmPasswordType] = useState("password");
  const togglePasswordVisibility = () => {
    setPasswordType(passwordType === "password" ? "text" : "password");
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordType(
      confirmPasswordType === "password" ? "text" : "password"
    );
  };
  return (
    <div className="flex  items-center justify-center min-h-screen bg-gray-100  flex-col-reverse md:flex-row">
      <div>
        <img src={signup} alt="" className="w-[500px]" />
      </div>
      <div className=" p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Full Name
            </label>
            <div className="flex gap-4">
              <input
                type="text"
                id="firstName"
                placeholder="First name"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <input
                type="text"
                id="lastName"
                placeholder="Last name"
                className="w-full border border-gray-300 p-2 rounded"
              />
            </div>
          </div>

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
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              My Role
            </label>
            <select
              id="role"
              className="w-full border border-gray-300 p-2 rounded"
            >
              <option value="student">Student</option>
              <option value="admin">Admin</option>
            </select>
          </div>

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
                placeholder="Create password"
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

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-gray-700 text-sm font-bold mb-2"
            >
              Confirm Password
            </label>{" "}
             
            <div className="relative">
              {" "}
               
              <input
                type={confirmPasswordType}
                id="confirmPassword"
                placeholder="Confirm password"
                className="w-full border border-gray-300 p-2 rounded"
              />
              <button
                type="button"
                className="absolute top-0 right-0 m-2"
                onClick={toggleConfirmPasswordVisibility}
              >
                {confirmPasswordType === "password" ? (
                  <FaEye />
                ) : (
                  <FaEyeSlash />
                )}
              </button>
            </div>
          </div>

          <div className="text-center">
            <button
              type="submit"
              className="bg-[#D25D09] hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignUpForm;

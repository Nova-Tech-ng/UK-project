import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">
        Welcome to the Student ML Prediction Project
      </h1>
      <div className="bg-white shadow-md rounded-lg p-8 mb-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Student</h2>
        <div className="flex justify-around">
          <Link
            to="/student/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/student/register"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Admin</h2>
        <div className="flex justify-around">
          <Link
            to="/admin/login"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Login
          </Link>
          <Link
            to="/admin/register"
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;

import axios from "axios";

// Set the base URL for the API
const API_BASE_URL = "https://gregoryalpha.pythonanywhere.com/api";

// Function to register a new student
export const registerStudent = async (studentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/student/register`,
      studentData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering student:", error);
    throw error;
  }
};

// Function to log in a student
export const loginStudent = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/student/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in student:", error);
    throw error;
  }
};

// Function to register an admin
export const registerAdmin = async (adminData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/student/register`,
      adminData
    );
    return response.data;
  } catch (error) {
    console.error("Error registering admin:", error);
    throw error;
  }
};

// Function to log in an admin
export const loginAdmin = async (credentials) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/admin/login`,
      credentials
    );
    return response.data;
  } catch (error) {
    console.error("Error logging in admin:", error);
    throw error;
  }
};

// Add other API functions here

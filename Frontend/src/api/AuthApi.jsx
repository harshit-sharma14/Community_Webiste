// src/services/authAPI.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';  // Update with your backend API URL

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/register`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    return response.data;  // Return the new user registration confirmation
  } catch (error) {
    console.error('Error registering user:', error);
    return null;
  }
};

// Login an existing user
export const loginUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/login`, userData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;  // Return the JWT token
  } catch (error) {
    console.error('Error logging in user:', error);
    return null;
  }
};

// Get the currently logged-in user’s details (assuming token is passed in headers)
export const getUserDetails = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;  // Return the logged-in user's details
  } catch (error) {
    console.error('Error fetching user details:', error);
    return null;
  }
};

// Logout the user
export const logoutUser = async () => {
  try {
    const response = await axios.post(`${API_URL}/logout`);
    return response.data;  // Return logout confirmation
  } catch (error) {
    console.error('Error logging out:', error);
    return null;
  }
};

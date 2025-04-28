import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create context
export const AuthContext = createContext();

// AuthContext provider component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(""); // State for messages
  const [error, setError] = useState(""); // State for error messages
  const navigate = useNavigate();
  const new_email="";
const new_password="";
  // Check for stored user data and token in localStorage
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem('authToken');
      if (token) {
        try {
          // Fetch the user data using the token
          const response = await axios.get('http://localhost:5000/api/users/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(response.data); // Set user if token is valid
        } catch (err) {
          console.error('Error fetching user data', err);
          setUser(null); // In case the token is invalid, clear the user
        }
      }
      setLoading(false); // Set loading to false after checking the token
    };
    checkUser();
  }, []); // Run this effect once on mount

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      
      const { token, user } = response.data;

      if (token) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user); // Set user after successful login
        navigate('/dashboard');
      } else {
        console.error('Token is undefined or null.');
      }
    } catch (err) {
      console.error('Login failed:', err.response ? err.response.data : err.message);
    }
  };

  // Register function
  const register = async ({ name, email, password }) => {
    try {
      const url = "http://localhost:5000/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });
  
      const result = await response.json();
      const { success, message, error, token, user } = result; // Ensure 'user' is part of the response
  
      if (success) {
        localStorage.setItem('authToken', token);
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        setUser(user); // Set the user object with the response data
        navigate('/dashboard');
      } else if (error) {
        handleError(error); // Handle specific error messages
      } else {
        handleError(); // Handle unexpected errors
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("An error occurred. Please try again.");
    }
  };
  

  // Logout function
  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
    navigate('/login');
  };

  // Success handler
  const handleSuccess = (msg) => {
    setMessage(msg); // Set success message
    setError(""); // Clear any previous error
  };

  // Error handler
  const handleError = (msg = "Something went wrong. Please try again.") => {
    setError(msg); // Set error message
    setMessage(""); // Clear success message
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, message, error }}>
      {children}
    </AuthContext.Provider>
  );
};

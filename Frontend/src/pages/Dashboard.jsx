// src/pages/Dashboard.jsx
import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext); // Access user data and logout function
  const navigate = useNavigate();

  // Handle navigation for different features
  const handleNavigate = (path) => {
    navigate(path);
  };

  // Handle logout and redirect to login page
  const handleLogout = () => {
    logout();
    navigate('/'); // Redirect to home or login page after logout
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 flex justify-center items-center">
      <div className="bg-white p-10 rounded-2xl shadow-2xl w-full max-w-3xl">
        <h1 className="text-4xl font-extrabold text-center mb-6 text-indigo-700">Community Dashboard</h1>
        {user ? (
          <div>
            <div className="mb-8 text-center">
              <p className="text-2xl font-semibold text-gray-800">Welcome, <span className="text-indigo-500">{user.name}!</span></p>
              <p className="text-gray-600 mt-2">Email: <span className="font-medium">{user.email}</span></p>
            </div>
            <div className="grid grid-cols-2 gap-6">
              {/* View Goods */}
              <button
                onClick={() => handleNavigate('/goodsview')}
                className="p-6 bg-green-500 text-white font-bold rounded-lg shadow-lg hover:bg-green-600 transition duration-200 flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h11M9 21V3m7 9h4m-4 4h3m-3-8h3m-3-4h3"
                  />
                </svg>
                View Second-Hand Goods
              </button>

              {/* Add Product */}
              <button
                onClick={() => handleNavigate('/addproduct')}
                className="p-6 bg-yellow-500 text-white font-bold rounded-lg shadow-lg hover:bg-yellow-600 transition duration-200 flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
                Add Product
              </button>

              {/* Request Service */}
              <button
                onClick={() => handleNavigate('/viewservices')}
                className="p-6 bg-blue-500 text-white font-bold rounded-lg shadow-lg hover:bg-blue-600 transition duration-200 flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-3-3v6m5-9a9 9 0 11-10 0 9 9 0 0110 0z"
                  />
                </svg>
                Request Service
              </button>

              {/* Add Service */}
              <button
                onClick={() => handleNavigate('/serviceupload')}
                className="p-6 bg-purple-500 text-white font-bold rounded-lg shadow-lg hover:bg-purple-600 transition duration-200 flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Add Service
              </button>

              {/* Forum */}
              <button
                onClick={() => handleNavigate('/forum')}
                className="p-6 bg-indigo-500 text-white font-bold rounded-lg shadow-lg hover:bg-indigo-600 transition duration-200 flex flex-col items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 mb-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 8h10M7 12h6m-6 4h10M5 21l5-5H3v5h2zm14-1v-4a1 1 0 00-1-1H8.5l5 5H19a1 1 0 001-1z"
                  />
                </svg>
                Forum
              </button>
            </div>
            <div className="mt-8 text-center">
              <button
                onClick={handleLogout}
                className="py-3 px-6 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-200"
              >
                Logout
              </button>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">Loading user information...</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;

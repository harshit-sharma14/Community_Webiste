import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, loading, logout } = useContext(AuthContext); // Destructure user and logout
  const navigate = useNavigate();

  if (loading) {
    return <div>Loading...</div>; // Display a loading message or spinner while loading
  }

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/')}
          className="text-white py-2 px-4 rounded-md"
        >
          MyApp
        </button>
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-sm">Welcome, {user.email}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => navigate('/login')}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                Login
              </button>
              <button
                onClick={() => navigate('/register')}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600"
              >
                Register
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

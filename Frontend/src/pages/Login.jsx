import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // Toggle password visibility

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(email, password); // Call login function from AuthContext
      navigate('/dashboard'); // Redirect to the dashboard after successful login
    } catch (err) {
      setError('Login failed. Please check your credentials.');
      console.error('Login error:', err.message || err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-yellow-600 p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-orange-600">
          Login
        </h2>

        {error && (
          <p
            className="text-red-500 text-center mb-4"
            role="alert"
            aria-live="assertive"
          >
            {error}
          </p>
        )}

        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />

        <div className="relative mb-6">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 focus:outline-none"
            aria-label="Toggle Password Visibility"
          >
            {showPassword ? '🙈' : '👁️'}
          </button>
        </div>

        <button
          type="submit"
          className={`flex items-center justify-center w-full p-3 rounded-lg text-white ${
            loading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-orange-500 hover:bg-orange-600'
          }`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              ></path>
            </svg>
          ) : (
            'Login'
          )}
        </button>

        <p className="text-center mt-4 text-gray-700">
          Don't have an account?{' '}
          <a href="/register" className="text-orange-500 hover:underline">
            Register here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Login;

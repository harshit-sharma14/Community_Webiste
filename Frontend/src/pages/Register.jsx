import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    setError('');
    try {
      await register({ name, email, password });
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Please try again.');
      console.error('Registration failed:', err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-green-400 to-blue-500">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-xl w-96 max-w-sm">
        <h2 className="text-3xl font-bold mb-6 text-center text-green-600">Create Account</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full p-3 mb-4 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          required
        />

        <div className="relative mb-4">
          <input
            type={showPassword ? 'text' : 'password'}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <div className="relative mb-6">
          <input
            type={showConfirmPassword ? 'text' : 'password'}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
            className="w-full p-3 border-2 border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showConfirmPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button
          type="submit"
          className={`w-full p-3 rounded-lg text-white ${loading ? 'bg-gray-400' : 'bg-green-500 hover:bg-green-600'}`}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p className="text-center mt-4 text-gray-700">
          Already have an account?{' '}
          <a href="/login" className="text-blue-500 hover:underline">
            Login here
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;

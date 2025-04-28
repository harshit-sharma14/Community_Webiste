// backend/middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

// Middleware to verify the token
const verifyToken = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token using secret
    req.userId = decoded.id; // Store user ID in request for later use
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(401).json({ message: 'Unauthorized!' });
  }
};

// Middleware to check if the user is an admin
const isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.userId); // Find user by ID stored in request
    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    if (user.role !== 'admin') { // Assuming the user model has a 'role' field
      return res.status(403).json({ message: 'Require Admin Role!' });
    }

    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    return res.status(500).json({ message: 'Error checking user role' });
  }
};

module.exports = {
  verifyToken,
  isAdmin,
};
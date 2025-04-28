authController.js
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "User already exists" });
    }
    user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, user });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };
authMiddleware.js
const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1];

  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Invalid or expired token.' });
    }
    req.user = user;
    next();
  });
};

module.exports = authMiddleware;
authRoutes.js
const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController'); // Import controller functions
const authMiddleware = require('../middleware/authMiddleware');

// Register route
router.post('/register', (req, res) => {
    console.log('Register route hit');
    register(req, res);
  });
  

// Login route
router.post('/login', login);
router.get('/me' ,(req, res) => {
  // The user information is already attached to the request object by the authenticateToken middleware
  res.json(req.user); // Send back the user data
});

module.exports = router;

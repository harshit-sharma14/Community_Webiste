const User = require('../models/User');
const jwt = require('jsonwebtoken');

// Register a new user
const register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: "User  already exists" });
    }
    user = new User({ name, email, password });
    await user.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ success: true, token, user }); // Include success property
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).json({ success: false, message: "Server error" }); // Include success property
  }
};

// Login an existing user
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user && await user.comparePassword(password)) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token,user });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { register, login };

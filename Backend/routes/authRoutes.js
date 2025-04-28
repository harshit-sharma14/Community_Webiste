const router = require('express').Router(); // Correctly instantiate the router
const { loginValidation, signupValidation,authenticateToken } = require('../middleware/authMiddleware');
const { login, register } = require('../controllers/authController');
const jwt = require('jsonwebtoken'); // Add this import if it's missing

const User=require('../models/User')
router.post('/login', loginValidation, async (req, res) => {
  const { email, password } = req.body;
  console.log('Hi')
  try {
    const user = await User.findOne({ email }); // Fetch user from DB
    console.log(user)
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with user info
    const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    console.log(user.name)
    res.json({ token,user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.post('/register', signupValidation, register);
router.get('/me', authenticateToken, async (req, res) => {
  try {
    // Get the user ID from the token payload (decoded)
    const userId = req.user._id;

    // Fetch user details from the database
    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user); // Send back the user details
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error.' });
  }
});
router.get('/username/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ username: user.username });
  } catch (error) {
    console.error('Error fetching username:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
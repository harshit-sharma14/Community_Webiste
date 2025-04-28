// const express = require('express');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');
// const authMiddleware = require('../middleware/authMiddleware'); // If you want to protect routes

// const router = express.Router();

// router.post('/register', async (req, res) => {
//   const { username, password, email } = req.body;

//   try {
//     let user = await User.findOne({ email: email });
//     if (user) {
//       return res.status(400).json({ message: "User  Exists Already" });
//     }
//     user = new User({ username, email, password });
//     await user.save();
//     const token = user.generateAuthToken();
//     res.status(201).json({ token });
//   } catch (e) {
//     console.log("Server Error");
//     console.log(e);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// // router.post('/login',async (req, res) => {
// //   const { email, password } = req.body;

// //   try {
// //     let user = await User.findOne({ email: email });
// //     if (!user) {
// //       return res.status(400).json({ message: "Invalid Credentials" });
// //     }

// //     let passMatch = await user.comparePassword(password); // Use the comparePassword method
// //     if (!passMatch) {
// //       return res.status(400).json({ message: "Invalid Credentials" });
// //     }

// //     const token = user.generateAuthToken();
// //     res.status(200).json({ token });
// //   } catch (e) {
// //     console.log("Server Error");
// //     console.log(e);
// //     res.status(500).json({ message: "Server error" });
// //   }
// // });
// router.post('/login', loginValidation, async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ email }); // Fetch user from DB
//     if (!user || !(await user.comparePassword(password))) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }

//     // Generate a JWT token with user info
//     const token = jwt.sign({ id: user._id, name: user.name }, process.env.JWT_SECRET, {
//       expiresIn: '1h',
//     });
//     console.log(user.name)
//     res.json({ token });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// router.get('/profile', async (req, res) => { // Protect this route
//   try {
//     const user = await User.findById(req.user.id);
//     res.json(user);
//   } catch (e) {
//     console.log("Server Error");
//     console.log(e);
//     res.status(500).json({ message: "Server error" });
//   }
// });

// module.exports = router;
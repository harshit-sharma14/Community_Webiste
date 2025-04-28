// backend/routes/comments.js
const express = require('express');
const Comment = require('../models/Comment');
const router = express.Router();
const { loginValidation, signupValidation,authenticateToken } = require('../middleware/authMiddleware');
const ensureAuth=require('../middleware/GoodsAuth')
// GET all comments
router.get('/', ensureAuth, async (req, res) => {
  try {
    // Fetch all comments and sort them by createdAt in descending order
    const comments = await Comment.find().sort({ createdAt: -1 });

    // Add the username to each comment
    const commentsWithUsernames = comments.map(comment => ({
      ...comment.toObject(), // Convert Mongoose document to plain object
      username: req.username, // Attach the username from the request
    }));

    // Send the response with comments and their associated usernames
    res.json(commentsWithUsernames);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST a new comment
router.post('/', ensureAuth, async (req, res) => {
  console.log('Hi')
  try {
    // Extract username from req.user (set by loginValidation middleware)
    const username = req.user.name;
    console.log(username)
    const comment = new Comment({
      name: username, // Use extracted username
      comment: req.body.comment,
    });

    const savedComment = await comment.save();
    res.status(201).json(savedComment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

module.exports = router;

const Comment = require('../models/Comment');

// Create a new comment
const createComment = async (req, res) => {
  try {
    const { text } = req.body;
    const newComment = new Comment({
      user: req.user.userId,
      text,
    });
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ message: 'Error creating comment', error });
  }
};

// Get all comments
const getComments = async (req, res) => {
  try {
    const comments = await Comment.find().populate('user', 'name');
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments', error });
  }
};

module.exports = { createComment, getComments };

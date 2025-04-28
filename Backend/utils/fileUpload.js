const express = require('express');
const multer = require('multer');
const Goods = require('../models/Goods'); // Assuming you have a Goods model

const router = express.Router();

// Multer setup for single file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Store files in the "uploads" directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Route for single file and other fields
router.post('/api/goods/upload', upload.single('image'), async (req, res) => {
  try {
    const { title, description, price } = req.body;

    // Validate required fields
    if (!title || !description || !price || !req.file) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create URL for the image
    const imageUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;

    // Save to database
    const newProduct = new Goods({
      title,
      description,
      price,
      images: [imageUrl], // Assuming you want to save the image URL in an array
    });

    await newProduct.save();
    res.status(201).json({ message: 'Product added successfully!', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ message: 'Failed to add product' });
  }
});

module.exports = router;
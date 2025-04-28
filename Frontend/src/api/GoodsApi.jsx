// backend/routes/goodsAPI.js
const express = require('express');
const router = express.Router();
const Goods = require('../models/Goods');
const { verifyToken, isAdmin } = require('../middlewares/authMiddleware');

// Fetch all goods
router.get('/', async (req, res) => {
  try {
    const goods = await Goods.find();
    res.json(goods);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching goods' });
  }
});

// Fetch a specific good by ID
router.get('/:id', async (req, res) => {
  try {
    const good = await Goods.findById(req.params.id);
    if (!good) {
      return res.status(404).json({ message: 'Good not found' });
    }
    res.json(good);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching good' });
  }
});

// Add a new good (admin only)
// backend/routes/goodsAPI.js
router.post('/upload', async (req, res) => {
    console.log("Hi")
    const { userId, title, description, price, images } = req.body;
  
    try {
      const newGood = new Goods({
        userId, // This should be provided in the request body, or you may set it to null if optional
        title,
        description,
        price,
        images,
      });
  
      await newGood.save();
      res.status(201).json(newGood);
    } catch (error) {
      console.error('Error adding good:', error);
      res.status(400).json({ message: 'Error adding good' });
    }
  });
module.exports = router;

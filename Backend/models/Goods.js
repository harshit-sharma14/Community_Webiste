const mongoose = require('mongoose');

// Schema for Goods model
const goodsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    minlength: 3,
  },
  description: {
    type: String,
    required: true,
    minlength: 10,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [{
    type: String, // URL or file path of images
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['available', 'sold', 'pending'],
    default: 'available',
  },
  ownerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to User model
    required: true,
  },
}, {
  timestamps: true,
});

// Export Goods model
module.exports = mongoose.model('Goods', goodsSchema);

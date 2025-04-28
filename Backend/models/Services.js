// backend/models/Goods.js
const mongoose = require('mongoose');

// Schema for Goods model
const servicesSchema = new mongoose.Schema({
  
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
  
  images: [{
    type: String, // URL or file path of images
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ['done', 'pending'],
    default: 'pending',
  },
}, {
  timestamps: true,
});

// Export Goods model
module.exports = mongoose.model('Services',servicesSchema);

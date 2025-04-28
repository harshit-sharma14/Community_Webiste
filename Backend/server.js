const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const jwt = require('jsonwebtoken');
const User=require('./models/User')
const router=express.Router()
const app = express();
const { getServices, uploadService} = require('./controllers/serviceController');
const commentRoutes=require('./routes/CommentRoutes')
const multer=require('multer')
app.use(express.json()); 
const { notFound, errorHandler } = require('./middleware/errorHandler');
const {authMiddleware}=require('./middleware/authMiddleware')
app.use(express.urlencoded({ extended: true })); // To parse form data
// Enable Cross-Origin Resource Sharing
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log('MongoDB connection failed:', err));
const authRoutes = require('./routes/authRoutes');
const goodsRoutes = require('./routes/goodsRoutes');
const serviceRoutes=require('./routes/ServiceRoutes');
const { decode } = require('punycode');
// Route to get all goods
// Serve static files from the uploads directory
 // GET /api/goods/:id
 


 app.use(cors({
  origin: 'http://localhost:5173', // Your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH'], // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  credentials: true // Allow credentials if needed
}));
// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/goods', goodsRoutes);
app.use('/api/services',serviceRoutes);
app.use('/api/comments', commentRoutes);
app.get('/api/users/me', async (req, res) => {
  // Extract token from Authorization header
  const token = req.headers['authorization']?.split(' ')[1];
  
  console.log(token); // Log the token for debugging purposes

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded.id); // Log the ID from the decoded token

    // Find user by decoded ID
    const user = await User.findById(decoded.id); // Use decoded.id instead of decoded._id

    console.log('User  found:', user); // Log the found user for debugging

    if (!user) {
      return res.status(404).json({ message: 'User  not found' });
    }

    // Return user data (you can send more fields if needed)
    res.json({ _id: user._id, username: user.username });
  } catch (error) {
    console.error('Error verifying token:', error.message); // Log the error for debugging
    res.status(401).json({ message: 'Invalid or expired token' });
  }
});
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, 'uploads')));
    
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }
  
  // Error handling middleware
  app.use(notFound); // Handles 404 errors
  app.use(errorHandler); // Handles general errors
  // In your backend (Node.js/Express)
  
  
  // Start the server
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
  
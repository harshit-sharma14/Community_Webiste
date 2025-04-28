  // GoodsRoute.js
  const express = require('express');

  const app=express();
  const path=require('path')
  const router = express.Router();
  const { getServices, uploadService,updateServiceStatus } = require('../controllers/serviceController');
  const authMiddleware = require('../middleware/authMiddleware'); 
  const multer=require('multer'); // Ensure authentication for some routes
const isadmin = require('../middleware/isadmin');
const ensureAuth = require('../middleware/GoodsAuth');
  // Route to get all goods

  router.get('/', ensureAuth,getServices);  // GET /api/goods
  router.patch('/:id', ensureAuth,updateServiceStatus);
  // Route to get a single good by ID
//   router.get('/:id', getSingleItem);  // GET /api/goods/:id
  const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Store files in the "uploads" directory
      },
      filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
      }
    });
    const upload=multer({storage})
  // Route to upload a new item (Requires authentication)
  router.post('/upload',ensureAuth,upload.single('image'), uploadService);  // POST /api/goods/upload
  
  // Route to delete a good by ID (Requires authentication)
//   router.delete('/:id', authMiddleware, deleteItem);  // DELETE /api/goods/:id

  module.exports = router;

// // GoodsRoute.js
// // const express = require('express');
// // const multer = require('multer');
// // const { getServices, uploadService, updateServiceStatus } = require('../controllers/serviceController');
// // const isadmin = require('../middleware/GoodsAuth'); // Middleware to check if user is admin

// // const router = express.Router();

// // // Configure multer storage for file uploads
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => {
// //         cb(null, 'uploads/'); // Store files in the "uploads" directory
// //     },
// //     filename: (req, file, cb) => {
// //         cb(null, Date.now() + '-' + file.originalname);
// //     }
// // });
// // const upload = multer({ storage });

// // // Route to get all services (Only accessible by admin)
// // router.get('/', isadmin, getServices);  // GET /api/goods

// // // Route to upload a new item (Requires admin authorization)
// // router.post('/upload', upload.single('image'), isadmin, uploadService);  // POST /api/goods/upload

// // // Route to update the service status (Requires admin authorization)
// // router.patch('/:id', isadmin, updateServiceStatus);  // PATCH /api/goods/:id

// // // Uncomment if you want to implement the delete functionality
// // // router.delete('/:id', isadmin, deleteItem);  // DELETE /api/goods/:id

// // module.exports = router;

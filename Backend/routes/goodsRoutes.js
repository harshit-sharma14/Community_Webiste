  // GoodsRoute.js
  const express = require('express');

  const app=express();
  const path=require('path')
  const router = express.Router();
  const { getGoods, uploadItem, getSingleItem } = require('../controllers/goodsController');
  const  ensureAuth  = require('../middleware/GoodsAuth');
  const authMiddleware = require('../middleware/authMiddleware'); 
  const isadmin=require('../middleware/isadmin')
  const multer=require('multer') // Ensure authentication for some routes
  // Route to get all goods
  router.get('/',ensureAuth, getGoods);  // GET /api/goods

  // Route to get a single good by ID
  router.get('/:id',ensureAuth, getSingleItem);  // GET /api/goods/:id
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
  router.post('/upload',ensureAuth,upload.single('image'), uploadItem);  // POST /api/goods/upload

  // DELETE /api/goods/:id

  module.exports = router;
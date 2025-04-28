const Goods = require('../models/Goods'); // Assuming you have a model defined

// Function to get all goods
const getGoods = async (req, res) => {
    console.log("getGoods function called"); // Log when this function is called
    try {
        
        const goods = await Goods.find();
        res.json(goods);
    } catch (error) {
        console.error("Error fetching goods:", error); // Log error details
        res.status(500).json({ message: error.message });
    }
};

// Function to upload a new item
const uploadItem = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        // Construct the image URL
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        console.log('Hi')
        const username = req.user._id;
        console.log(username)
        // Save product info to DB (add title, description, price, imageUrl)
        const newProduct = new Goods({
            title: req.body.title,
            description: req.body.description,
            price: req.body.price,
            images: [req.file.filename], // Save just the filename in the 'images' field (array)
            status: 'available',
            ownerId:username,
        });

        await newProduct.save();

        res.status(201).json({
            success: true,
            message: 'Product added successfully!',
            image_url: imageUrl,  // Return the image URL in the response
        });
    } catch (error) {
        console.error('Error uploading item:', error);
        res.status(500).json({ success: false, message: 'Failed to upload product' });
    }
};
  

// Function to get a single item by ID
const getSingleItem = async (req, res) => {
    console.log("getSingleItem function called with ID:", req.params.id); // Log when this function is called with the ID
    try {
        const item = await Goods.findById(req.params.id);
        if (!item) {
            console.log("Item not found for ID:", req.params.id); // Log if item is not found
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item);
    } catch (error) {
        console.error("Error fetching item:", error); // Log error details
        res.status(500).json({ message: error.message });
    }
};

// Function to delete an item by ID

module.exports = {
    getGoods,
    uploadItem,
    getSingleItem,
    
};
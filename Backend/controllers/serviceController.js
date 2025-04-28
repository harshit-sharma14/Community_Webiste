const Services = require('../models/Services'); // Assuming you have a model defined

// Function to get all goods
const getServices = async (req, res) => {
    console.log("getServices function called");
    try {
        const services = await Services.find();
        res.json(services);
    } catch (error) {
        console.error("Error fetching goods:", error);
        res.status(500).json({ message: error.message });
    }
};

// Function to upload a new item
// Function to update the status of a service to 'done'
const updateServiceStatus = async (req, res) => {
    try {
        console.log('hello')
        const { id } = req.params; 
        console.log(id) // Get the service ID from the request params
        const service = await Services.findById(id);

        if (!service) {
            return res.status(404).json({ message: 'Service not found' });
        }

        // Update the status to 'done'
        service.status = 'done';
        await service.save();

        res.json({ success: true, message: 'Service status updated to done' });
    } catch (error) {
        console.error("Error updating service status:", error);
        res.status(500).json({ success: false, message: 'Failed to update service status' });
    }
};



const uploadService = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: 'No image uploaded' });
        }

        // Construct the image URL
        const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
        console.log('Service')
        // Save product info to DB (add title, description, price, imageUrl)
        const newService = new Services({
            title: req.body.title,
            description: req.body.description,
            
            images: [req.file.filename], // Save just the filename in the 'images' field (array)
            status: 'pending',
        });

        await newService.save();

        res.status(201).json({
            success: true,
            message: 'Service Submitted',
            image_url: imageUrl,  // Return the image URL in the response
        });
    } catch (error) {
        console.error('Error uploading item:', error);
        res.status(500).json({ success: false, message: 'Failed to upload service' });
    }
};
  

// Function to get a single item by ID
// const getSingleItem = async (req, res) => {
//     console.log("getSingleItem function called with ID:", req.params.id); // Log when this function is called with the ID
//     try {
//         const item = await Goods.findById(req.params.id);
//         if (!item) {
//             console.log("Item not found for ID:", req.params.id); // Log if item is not found
//             return res.status(404).json({ message: 'Item not found' });
//         }
//         res.json(item);
//     } catch (error) {
//         console.error("Error fetching item:", error); // Log error details
//         res.status(500).json({ message: error.message });
//     }
// };

// Function to delete an item by ID
const deleteItem = async (req, res) => {
    console.log("deleteItem function called with ID:", req.params.id); // Log when this function is called with the ID
    try {
        const deletedItem = await Goods.findByIdAndDelete(req.params.id);
        if (!deletedItem) {
            console.log("Item not found for deletion ID:", req.params.id); // Log if item is not found
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json({ message: 'Item deleted' });
    } catch (error) {
        console.error("Error deleting item:", error); // Log error details
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getServices,
    uploadService,
    updateServiceStatus,  // Export the new function
};
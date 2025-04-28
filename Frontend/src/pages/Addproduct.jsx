import React, { useState } from 'react';
import axios from 'axios';
import Footer from './Footer';

const AddProduct = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.price || !image) {
      setErrorMessage('Please fill out all fields and upload an image.');
      return;
    }

    setLoading(true);
    setSuccessMessage('');
    setErrorMessage('');

    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('image', image);

    try {
      const authToken = localStorage.getItem('authToken');
      const response = await axios.post('http://localhost:5000/api/goods/upload', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${authToken}`,
        },
      });

      if (response.data.success) {
        setSuccessMessage('Product added successfully!');
        setFormData({ title: '', description: '', price: '' });
        setImage(null);
      } else {
        setErrorMessage(response.data.message || 'Failed to add product.');
      }
    } catch (error) {
      if (error.response && (error.response.status === 401 || error.response.status === 403)) {
        setErrorMessage('Access denied. Please log in to continue.');
      } else {
        setErrorMessage('Error adding product. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Add Product</h2>

        {successMessage && (
          <div className="text-green-600 text-center mb-4">{successMessage}</div>
        )}

        {errorMessage && (
          <div className="text-red-600 text-center mb-4">{errorMessage}</div>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-4">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter product title"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Description:</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter product description"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Price:</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
              placeholder="Enter product price"
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Image:</label>
            <input
              type="file"
              name="image"
              onChange={handleFileChange}
              accept="image/*"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 px-4 ${loading ? 'bg-indigo-300' : 'bg-indigo-600'} text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition duration-300`}
          >
            {loading ? 'Adding Product...' : 'Add Product'}
          </button>
        </form>

      </div>
    
    </div>
  );
};

export default AddProduct;

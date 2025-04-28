// src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth'; // Change this to your backend API URL

// Fetch all goods
export const getGoods = async () => {
  try {
    const response = await axios.get(`${API_URL}/goods`);
    return response.data;  // Return the list of goods
  } catch (error) {
    console.error('Error fetching goods:', error);
    return [];
  }
};
export const getServices = async () => {
  try {
    const response = await axios.get(`${API_URL}/services`);
    return response.data;  // Return the list of goods
  } catch (error) {
    console.error('Error fetching goods:', error);
    return [];
  }
};

// Fetch all services


// Get a specific good by ID
export const getGoodById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/goods/${id}`);
    return response.data;  // Return the specific good's data
  } catch (error) {
    console.error('Error fetching good by ID:', error);
    return null;
  }
};

// Fetch the community forum posts

// Post a new forum message


// Send service request


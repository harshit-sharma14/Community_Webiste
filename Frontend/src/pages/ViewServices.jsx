import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewServices = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);

  // Fetch services data from API on component mount
  useEffect(() => {
    const authToken=localStorage.getItem('authToken');
    const fetchServices = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/services', {
          headers: { Authorization: `Bearer ${authToken}` },
      });
        setServices(response.data);
      } catch (error) {
        console.error('Error fetching services:', error);
        setError('Error fetching services.');
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const handlePurchaseClick = async (item) => {
    setSelectedItem(item); // Set the selected item
    const authToken = localStorage.getItem('authToken');
    
    try {
      // Send PATCH request to update the service status to "done"
      const response = await axios.patch(
        `http://localhost:5000/api/services/${item._id}`, 
        { status: 'done' }, // Data to update
        {
          headers: { Authorization: `Bearer ${authToken}` },
          credentials:true,
        }
      );
  
      if (response.status === 200) {
        // Update the service status in the state after a successful update
        setServices(services.map(service =>
          service._id === item._id ? { ...service, status: 'done' } : service
        ));
      } else {
        throw new Error('Failed to update service status.');
      }
    } catch (error) {
      console.error('Error updating service status:', error);
      setError('Failed to update service status.');
    }
  };
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 w-16 h-16"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-500 font-semibold text-xl">
        {error}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-900">Available Services</h2>
      {services.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {services.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 hover:shadow-2xl"
            >
              {/* Check if item has images and display the first one */}
              {item.images && item.images.length > 0 ? (
                <img
                  src={`http://localhost:5000/uploads/${item.images[0]}`} // Full URL from MongoDB
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-gray-500 rounded-t-lg">
                  No image available
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>

                <div className="flex justify-between items-center mt-4">
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'done' ? 'bg-green-100 text-green-600' : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <button
                  onClick={() => handlePurchaseClick(item)} // Pass the entire item object
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none"
                >
                  Accept
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No services available to display.</p>
      )}

      {/* Optional: Show selected item details (e.g., in a modal) */}
      {selectedItem && (
        <div className="modal">
          <h2>{selectedItem.title}</h2>
          <p>{selectedItem.description}</p>
          <p>Status: {selectedItem.status}</p>
          {/* You can add more details and styles here */}
        </div>
      )}
    </div>
  );
};

export default ViewServices;

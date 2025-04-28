import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GoodsView = () => {
  const [goods, setGoods] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const authToken = localStorage.getItem('authToken');
    
        // Fetch goods data
        const response = await axios.get('http://localhost:5000/api/goods', {
          headers: { Authorization: `Bearer ${authToken}` },
        });
    
        // Map through goods to include username
        const goodsWithUsernames = await Promise.all(
          response.data.map(async (item) => {
            console.log(item)
            if (item.ownerId) {
              try {
                // Fetch username based on ownerId
                const userResponse = await axios.get(
                  `http://localhost:5000/api/users/${item.ownerId}`, // Endpoint to fetch user data by ID
                  {
                    headers: { Authorization: `Bearer ${authToken}` },
                  }
                );
                return { ...item, username: userResponse.data.username };
              } catch (error) {
                console.error(`Error fetching username for ownerId: ${item.ownerId}`, error);
                return { ...item, username: 'Unknown User' }; // Fallback username
              }
            }
            return { ...item, username: 'Unknown User' }; // Default when ownerId is not available
          })
        );
    
        setGoods(goodsWithUsernames);
      } catch (error) {
        console.error('Error fetching goods:', error);
        setError('Oops! Something went wrong while fetching goods.');
      } finally {
        setLoading(false);
      }
    };

    fetchGoods();
  }, []);

  const handlePurchaseClick = (item) => {
    setSelectedItem(item);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedItem(null);
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
    <div className="bg-gradient-to-b from-blue-50 to-gray-100 min-h-screen p-4">
      <header className="bg-gradient-to-r from-blue-500 to-purple-500 py-8 text-center rounded-lg shadow-md mb-8">
        <h1 className="text-4xl font-extrabold text-white">Available Goods</h1>
        <p className="text-lg text-gray-100 mt-2">Find the best deals on second-hand goods!</p>
      </header>

      {goods.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {goods.map((item) => (
            <div
              key={item._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-2xl transform transition-all hover:scale-105"
            >
              {item.images && item.images.length > 0 ? (
                <img
                  src={`http://localhost:5000/uploads/${item.images[0]}`}
                  alt={item.title}
                  className="w-full h-64 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-64 bg-gradient-to-r from-gray-200 to-gray-300 flex items-center justify-center text-gray-500 rounded-t-lg">
                  No Image Available
                </div>
              )}

              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                <p className="text-gray-600 mt-2">{item.description}</p>
                <p className="text-gray-500 text-sm mt-1">Owner: {item.username}</p>

                <div className="flex justify-between items-center mt-4">
                  <p className="text-lg font-bold text-blue-600">₹{item.price}</p>
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      item.status === 'Available'
                        ? 'bg-green-100 text-green-600'
                        : 'bg-yellow-100 text-yellow-600'
                    }`}
                  >
                    {item.status}
                  </span>
                </div>

                <button
                  onClick={() => handlePurchaseClick(item)}
                  className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition duration-300 transform hover:scale-105 focus:outline-none"
                >
                  Purchase
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No goods available to display.</p>
      )}

      {showModal && selectedItem && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96 transform transition-all scale-110">
            <h3 className="text-2xl font-semibold text-center text-gray-900 mb-4">Contact the Owner</h3>
            <p className="text-gray-700 mb-4">
              To purchase <strong>{selectedItem.title}</strong>, please contact the owner directly.
            </p>
            <p className="text-gray-600">Owner: {selectedItem.username}</p>
            <p className="text-gray-600 mb-4">Owner Email: {selectedItem.ownerEmail}</p>

            <div className="flex justify-center">
              <button
                onClick={handleCloseModal}
                className="bg-red-500 text-white px-6 py-2 rounded-full hover:bg-red-600 transition duration-300 transform"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GoodsView;

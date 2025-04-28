// src/components/NearbyShops.js
import React from 'react';

const shops = [
  {
    id: 1,
    name: 'Sharma General Store',
    address: 'B-12, Connaught Place, New Delhi',
    description: 'Daily essentials, snacks, and groceries.',
    openingHours: '9:00 AM',
    closingHours: '10:00 PM',
  },
  {
    id: 2,
    name: 'Raj Electronics',
    address: 'B-20, Connaught Place, New Delhi',
    description: 'Latest gadgets and home electronics.',
    openingHours: '10:00 AM',
    closingHours: '9:00 PM',
  },
  {
    id: 3,
    name: 'Lakshmi Book Store',
    address: 'B-1, Connaught Place, New Delhi',
    description: 'Wide range of books, from novels to textbooks.',
    openingHours: '10:00 AM',
    closingHours: '8:00 PM',
  },
  {
    id: 4,
    name: 'Cafe Chaiwala',
    address: 'B-2, Connaught Place, New Delhi',
    description: 'Popular for chai and snacks.',
    openingHours: '7:00 AM',
    closingHours: '11:00 PM',
  },
];

const NearbyShops = () => {
  return (
    <div className="bg-gradient-to-r from-blue-100 via-white to-pink-100 min-h-screen py-10 px-6">
      <h2 className="text-4xl font-extrabold text-gray-800 text-center mb-10">Nearby Shops</h2>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
        {shops.map((shop) => (
          <div
            key={shop.id}
            className="bg-white rounded-xl shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1 hover:scale-105"
          >
            <h3 className="text-2xl font-semibold text-gray-800 mb-2">{shop.name}</h3>
            <p className="text-gray-500 mb-4 italic">{shop.address}</p>
            <p className="text-gray-700 mb-4">{shop.description}</p>
            <div className="flex justify-between items-center text-gray-600 text-sm font-medium">
              <p>
                <span className="font-bold text-green-600">Open:</span> {shop.openingHours}
              </p>
              <p>
                <span className="font-bold text-red-600">Close:</span> {shop.closingHours}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NearbyShops;

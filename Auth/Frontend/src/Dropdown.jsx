import React from 'react'
import { useState,useEffect } from 'react';
export const Dropdown = () => {

    return (
        <div>
          {/* Dropdown for Country Filter */}
          <div className="mb-4">
            <label className="block text-gray-700">Filter by Country:</label>
            <select
              value={selectedCountry}
              onChange={(e) => setSelectedCountry(e.target.value)}
              className="mt-2 block w-full p-2 border rounded-lg shadow-sm"
            >
              <option value="">All Countries</option>
              {Array.from(new Set(data.map(item => item.country))).map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
    
          {/* Visualization Section */}
          <div>
            {filteredData.length === 0 ? (
              <p>No data available for the selected country.</p>
            ) : (
              <div>
                {/* Render charts, cards, or tables here using `filteredData` */}
              </div>
            )}
          </div>
        </div>
      );
    };
    
}

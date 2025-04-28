import React, { useState, useEffect } from 'react';
import UserInteraction from './UserInteraction';

const CountryFilter = ({ data }) => {
  const [selectedCountry, setSelectedCountry] = useState('');
  const [countryData, setCountryData] = useState(null);

  // Update country data when the selected country changes
  useEffect(() => {
    if (selectedCountry) {
      const filteredData = data.find((item) => item.country === selectedCountry);
      setCountryData(filteredData);
    }
  }, [selectedCountry, data]);

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Select a Country</h2>

      {/* Dropdown Filter */}
      <select
        value={selectedCountry}
        onChange={(e) => setSelectedCountry(e.target.value)}
        className="w-full p-3 bg-gray-900 rounded-lg border border-gray-300"
      >
        <option value="" disabled>Select a country</option>
        {data.map((item) => (
          <option key={item.country} value={item.country}>
            {item.country}
          </option>
        ))}
      </select>

      {/* Display Selected Country Data */}
      {countryData && (
        <div className="mt-6 p-4 bg-gray-900 rounded-lg text-white border-white">
          
          <UserInteraction countryData={countryData}/>
        </div>
      )}
    </div>
  );
};

export default CountryFilter;

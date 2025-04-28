import React, { useState } from 'react';

const UserInteraction = ({countryData}) => {
  // Initial values for Denmark
  const [metrics, setMetrics] = useState({
    gdp: countryData.gdp || 0,  // Default to 0 if gdp is not present
    health: countryData.health || 0.996,  // Default to 0.996 if health is not present
    freedom: countryData.freedom || 0.592,  // Default to 0.592 if freedom is not present
  });


  const [happinessScore, setHappinessScore] = useState(countryData.happinessScore);

  // Weights for each metric (can be adjusted based on a model or data)
  const weights = {
    gdp: 0.4,      // 40% weight
    health: 0.3,   // 30% weight
    freedom: 0.3,  // 30% weight
  };

  // Function to update metric and recalculate happiness score
  const handleInputChange = (metric, value) => {
    const newMetrics = { ...metrics, [metric]: parseFloat(value) };
    setMetrics(newMetrics);

    // Calculate new happiness score based on weights
    const newHappinessScore =
      newMetrics.gdp * weights.gdp +
      newMetrics.health * weights.health +
      newMetrics.freedom * weights.freedom;

    setHappinessScore(newHappinessScore.toFixed(2)); // Keep two decimal places
  };

  return (
    <div className="p-6 bg-gray-900 rounded-lg shadow-md">
        <h3 className="text-xl font-semibold text-white-700">{countryData.country}</h3>
          <p className="text-lg text-white-600">Happiness Score: {countryData.happinessScore}</p>
          <p className="text-lg text-white-600">GDP: {countryData.gdp}</p>
          <p className="text-lg text-white-600">Health: {countryData.health}</p>
          <p className="text-lg text-white-600">Freedom: {countryData.freedom}</p>
      <h2 className="text-2xl font-semibold text-white-800 mb-4">Adjust Metrics</h2>
      
      {/* GDP Slider */}
      <div className="mb-4">
        <label htmlFor="gdp" className="block text-white-600">GDP (Current: {metrics.gdp})</label>
        <input
          id="gdp"
          type="range"
          min="0"
          max="2"
          step="0.01"
          value={metrics.gdp}
          onChange={(e) => handleInputChange('gdp', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Health Slider */}
      <div className="mb-4">
        <label htmlFor="health" className="block text-white-600">Health (Current: {metrics.health})</label>
        <input
          id="health"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={metrics.health}
          onChange={(e) => handleInputChange('health', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Freedom Slider */}
      <div className="mb-4">
        <label htmlFor="freedom" className="block text-white-600">Freedom (Current: {metrics.freedom})</label>
        <input
          id="freedom"
          type="range"
          min="0"
          max="10"
          step="0.01"
          value={metrics.freedom}
          onChange={(e) => handleInputChange('freedom', e.target.value)}
          className="w-full"
        />
      </div>

      {/* Display Adjusted Happiness Score */}
      <div className="mt-6 p-4 bg-gray-900 rounded-lg">
        <h3 className="text-xl font-semibold text-white-700">Adjusted Happiness Score:</h3>
        <p className="text-4xl font-bold text-green-600">{happinessScore}</p>
      </div>
    </div>
  );
};

export default UserInteraction;

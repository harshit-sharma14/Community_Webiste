import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';

const GdpVsHappiness = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Example of fetching data (you can replace this with your API request)
    fetch('http://localhost:5000/happinessData') // Replace with your actual API endpoint
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error('Error fetching data:', error));
  }, []);

  // Extract the data
  const countries = data.map((item) => item.country);
  const gdp = data.map((item) => item.gdp);
  const happinessScores = data.map((item) => item.happinessScore);

  // Plotly chart data structure
  const chartData = {
    type: 'scatter',
    mode: 'markers',
    x: gdp,
    y: happinessScores,
    text: countries,
    marker: {
      color: happinessScores, // Color the markers by the Happiness Score
      colorscale: 'Set1', // You can change the color scale to your liking
      showscale: true, // Show the color scale bar
    },
  };

  const layout = {
    title: 'GDP per Capita vs Happiness Score',
    xaxis: {
      title: 'GDP per Capita',
      type: 'linear',
    },
    yaxis: {
      title: 'Happiness Score',
      range: [0, 10], // Customize range if needed
    },
    showlegend: false,
    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the chart area
    plot_bgcolor: 'rgba(0,0,0,0)', // Transparent background for the plot
    font: {
      color: '#ffffff', // White text for better visibility
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white p-6">
      <h1 className="text-3xl font-bold text-center mb-6">
        🌐 GDP per Capita vs Happiness Score
      </h1>
      <div className="flex justify-center items-center bg-gray-800 p-6 rounded-lg shadow-lg">
        {data.length === 0 ? (
          <p className="text-gray-400">Loading data...</p>
        ) : (
          <Plot
            data={[chartData]}
            layout={layout}
            config={{ displayModeBar: false }}
            className="w-full h-96"
          />
        )}
      </div>
    </div>
  );
};

export default GdpVsHappiness;

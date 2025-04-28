import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { Line } from 'react-chartjs-2';
import { Chart } from 'chart.js';
import { CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const Geography = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/happinessData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Extracting countries and happiness scores for the chart
  const countries = data.map((item) => item.country);
  const happinessScores = data.map((item) => item.happinessScore); // Ensure happinessScore is correct field

  // Chart.js data structure for the line chart
  const chartData = {
    labels: countries,
    datasets: [
      {
        label: 'Happiness Score',
        data: happinessScores,
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Happiness Score by Country',
        color: '#ffffff', // White title for better contrast on blue background
      },
      legend: {
        labels: {
          color: '#ffffff', // White text for the legend
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: '#ffffff', // White labels for the x-axis
        },
      },
      y: {
        ticks: {
          color: '#ffffff', // White labels for the y-axis
        },
      },
    },
  };

  // Choropleth Map Data
  const mapData = {
    type: 'choropleth',
    locationmode: 'country names',
    locations: data.map((item) => item.country), // Ensure correct key
    z: data.map((item) => item.happinessScore), // Ensure this field is correct
    colorscale: 'Plasma',
    colorbar: {
      title: 'Happiness Score',
      titlefont: { color: '#ffffff' },
      tickfont: { color: '#ffffff' },
    },
  };

  const layout = {
    title: "World Happiness Score by Country",
    titlefont: { color: '#ffffff' },
    geo: {
      showframe: false,
      projection: {
        type: 'natural earth',
      },
      bgcolor: 'rgba(0,0,0,0)', // Transparent map background
    },
    paper_bgcolor: 'rgba(0,0,0,0)', // Transparent background
    plot_bgcolor: 'rgba(0,0,0,0)', // Transparent plot area
    font: {
      color: '#ffffff', // White text throughout the layout
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white p-6">
      {/* Line Chart for Happiness Score */}
      <div className="mb-10 bg-gray-900 p-6 rounded-lg shadow-lg">
        {data.length === 0 ? (
          <p className="text-gray-300">Loading chart data...</p>
        ) : (
          <Line data={chartData} options={chartOptions} />
        )}
      </div>

      {/* Choropleth Map for Happiness Score */}
      <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg">
        {data.length === 0 ? (
          <p className="text-gray-300">Loading map data...</p>
        ) : (
          <Plot
            data={[mapData]}
            layout={layout}
            config={{ displayModeBar: false }}
            className="w-full"
          />
        )}
      </div>
    </div>
  );
};

export default Geography;

import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import {Chart, PointElement} from 'chart.js';
Chart.register(PointElement);

// Registering chart.js components
ChartJS.register(CategoryScale, LinearScale, LineElement, Title, Tooltip, Legend);

const ChartE = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from your API
    fetch("http://localhost:5000/happinessData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Extracting countries and happiness scores for the chart
  const countries = data.map(item => item.country);
  // Assuming 'country' is the name of the field in your data
  const happinessScores = data.map(item => item.happinessScore); // Assuming 'happiness_score' is the field

  // Chart.js data structure
  const chartData = {
    labels: countries, // X-axis (Countries)
    datasets: [
      {
        label: 'Happiness Score',
        data: happinessScores, // Y-axis (Scores)
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Happiness Score by Country',
      },
    },
  };

  return (
    <div className="w-full">
      {/* Loading state */}
      {data.length === 0 ? (
        <p>Loading chart data...</p>
      ) : (
        <Line data={chartData} options={options} />
      )}
    </div>
  );
};

export default ChartE;

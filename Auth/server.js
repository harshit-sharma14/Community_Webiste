const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 8000;

app.use(cors()); // Enable CORS for frontend requests
app.use(express.json()); // Parse JSON payloads

// Fetch happiness data from json-server
const DATA_URL = 'http://localhost:5000/happinessData';

// Endpoint for top 10 happiest countries
app.get('/api/top-countries', async (req, res) => {
  try {
    const response = await axios.get(DATA_URL);
    const data = response.data;

    // Sort by Score in descending order and get top 10
    const topCountries = data
      .sort((a, b) => b.Score - a.Score)
      .slice(0, 10);

    res.json(topCountries);
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Error fetching data' });
  }
});

// Endpoint for correlation analysis
app.get('/api/correlation', async (req, res) => {
  try {
    const response = await axios.get(DATA_URL);
    const data = response.data;

    // Calculate simple correlations between columns
    const correlations = {};
    const fields = ['GDP per capita', 'Social support', 'Healthy life expectancy', 'Freedom to make life choices', 'Generosity', 'Perceptions of corruption'];

    fields.forEach((field) => {
      const correlation = calculateCorrelation(data, 'Score', field);
      correlations[field] = correlation;
    });

    res.json(correlations);
  } catch (error) {
    console.error('Error fetching correlation data:', error.message);
    res.status(500).json({ message: 'Error fetching correlation data' });
  }
});

// Function to calculate correlation between two fields
function calculateCorrelation(data, fieldX, fieldY) {
  const x = data.map((item) => item[fieldX]);
  const y = data.map((item) => item[fieldY]);

  const meanX = x.reduce((a, b) => a + b, 0) / x.length;
  const meanY = y.reduce((a, b) => a + b, 0) / y.length;

  const numerator = x
    .map((xi, i) => (xi - meanX) * (y[i] - meanY))
    .reduce((a, b) => a + b, 0);

  const denominator = Math.sqrt(
    x.map((xi) => Math.pow(xi - meanX, 2)).reduce((a, b) => a + b, 0) *
    y.map((yi) => Math.pow(yi - meanY, 2)).reduce((a, b) => a + b, 0)
  );

  return numerator / denominator;
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

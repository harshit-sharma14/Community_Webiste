import React from 'react';
import { useState, useEffect } from 'react';
import HappinessChart from './HapinessChart';
import Dashboard from './Dashboard';
const HappinessData = () => {
    const [data, setData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/happinessData")
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  return (
    <div>
      <h1>Happiness Data</h1>

      <Dashboard data={data}/>
      {/* Additional JSX components or data can be rendered here */}
    </div>
  );
};

export default HappinessData;

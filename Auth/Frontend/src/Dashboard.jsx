import React, { useState, useEffect } from 'react';
import ChartE from './ChartE'; // Import your chart component
import Geography from './Geography'; // Import your geography component
import GdpVsHappiness from './GdpVsHappiness';
import { Toptobottom } from './Toptobottom';
import CountryFilter from './CountryFilter';

const Dashboard = ({ data }) => {
  const [filteredData, setFilteredData] = useState(data);
  const [selectedCountry, setSelectedCountry] = useState('');
  

  const stats = [
    { label: 'Happiness Score', value: '7.5', color: 'text-green-400', bg: 'bg-green-900' },
    { label: 'GDP per Capita', value: '$45,000', color: 'text-blue-400', bg: 'bg-blue-900' },
    { label: 'Social Support', value: '8.1', color: 'text-indigo-400', bg: 'bg-indigo-900' },
    { label: 'Life Expectancy', value: '80.5', color: 'text-purple-400', bg: 'bg-purple-900' },
    { label: 'Freedom to Make Life Choices', value: '7.8', color: 'text-yellow-400', bg: 'bg-yellow-900' },
    { label: 'Generosity', value: '6.3', color: 'text-red-400', bg: 'bg-red-900' },
  ];

  useEffect(() => {
    // Filter data whenever `selectedCountry` changes
    if (selectedCountry) {
      setFilteredData(data.filter(item => item.country === selectedCountry));
    } else {
      setFilteredData(data); // Reset to full data
    }
  }, [selectedCountry, data]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white p-6">
      <CountryFilter data={data}/>
      <div className="max-w-7xl mx-auto">
        {/* Dashboard Header */}
        <header className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-white">🌌 World Happiness Dashboard</h1>
          <p className="text-gray-400 mt-2">Insights into global happiness factors</p>
        </header>

        {/* Stats Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`p-6 rounded-lg shadow-lg flex flex-col items-center justify-center transform hover:scale-105 transition-all duration-300 ${stat.bg}`}
            >
              <div className={`text-5xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-lg font-medium text-gray-300 mt-2">{stat .label}</div>
            </div>
          ))}
        </div>

        {/* Chart Section */}
        <div className="mt-12 bg-gray-800 p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-white mb-4 text-center">📊 Happiness Metrics</h2>
          <Toptobottom data={data}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-medium text-gray-300 mb-4">Happiness vs GDP</h3>
             
            </div>
          </div>
          <div className='w-full h-auto'>
            <h3 className="text-xl font-medium text-gray-300 mb-4">Geographical Distribution</h3>
            <Geography data={filteredData} />
          </div>
          <div className>
            <h3 className="text-xl font-medium text-gray-300 mb-4">GDP vs Happiness</h3>
            <GdpVsHappiness data={filteredData} />
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
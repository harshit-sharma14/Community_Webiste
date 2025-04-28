import React from 'react'

export const Toptobottom = ({data}) => {
    const getTopPerformers = (data, count = 5) => {
        return [...data].sort((a, b) => b.Score - a.Score).slice(0, count);
      };
      
      const getBottomPerformers = (data, count = 5) => {
        return [...data].sort((a, b) => b.Score - a.Score).slice(-count);
      };
      const top=getTopPerformers(data);
      const bottom=getBottomPerformers(data);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Top Performers */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white-800 mb-4">Top Performers</h2>
            <ul>
              {top.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 border-b pb-2"
                >
                  <span className="text-white-600">{item.country}</span>
                  <span className="text-green-600 font-semibold">{item.happinessScore}</span>
                </li>
              ))}
            </ul>
          </div>
    
          {/* Bottom Performers */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold text-white-800 mb-4">Bottom Performers</h2>
            <ul>
              {bottom.map((item, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center mb-2 border-b pb-2"
                >
                  <span className="text-white-600">{item.country}</span>
                  <span className="text-red-600 font-semibold">{item.happinessScore}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      );
}

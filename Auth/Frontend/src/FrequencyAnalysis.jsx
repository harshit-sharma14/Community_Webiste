import React from 'react';

const FrequencyAnalysis = ({ text, setResult }) => {
  const frequencyAnalysis = (text) => {
    let frequency = {};
    text.replace(/[a-zA-Z]/g, (char) => {
      frequency[char] = (frequency[char] || 0) + 1;
    });
    return frequency;
  };

  const handleAnalysis = () => {
    const analysis = frequencyAnalysis(text);
    setResult(JSON.stringify(analysis, null, 2));
  };

  return (
    <div className="my-4">
      <button onClick={handleAnalysis} className="p-2 bg-yellow-600 text-white rounded">Frequency Analysis</button>
    </div>
  );
};

export default FrequencyAnalysis;

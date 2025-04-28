import React, { useState, useEffect } from 'react';
import CaesarCipher from './CeaserCipher';
import BruteForce from './BruteForce';
import FrequencyAnalysis from './FrequencyAnalysis';

function App() {
  const [inputText, setInputText] = useState('');
  const [shift, setShift] = useState(3);
  const [result, setResult] = useState('');
  const [history, setHistory] = useState([]);

  // Load history from localStorage on component mount
  useEffect(() => {
    const savedHistory = JSON.parse(localStorage.getItem('messageHistory')) || [];
    setHistory(savedHistory);
  }, []);

  // Save new result to history and localStorage
  const saveToHistory = (message) => {
    const newHistory = [...history, { text: message, timestamp: new Date().toLocaleString() }];
    setHistory(newHistory);
    localStorage.setItem('messageHistory', JSON.stringify(newHistory)); // Store in localStorage
  };

  const handleResult = (message) => {
    setResult(message);
    saveToHistory(message); // Save result to history after each encryption/decryption
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-800 text-white">
      <h1 className="text-4xl font-bold text-blue-400 my-4">Advanced Caesar Cipher Decoder</h1>
      
      {/* Input Section */}
      <div className="w-full max-w-lg p-4 bg-gray-700 rounded-lg shadow-lg">
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-800"
          placeholder="Enter text to encrypt/decrypt"
        />
        
        <input
          type="number"
          value={shift}
          onChange={(e) => setShift(Number(e.target.value))}
          className="w-full p-2 mb-4 border border-gray-600 rounded bg-gray-800"
          placeholder="Shift value"
        />
        
        <CaesarCipher text={inputText} shift={shift} setResult={handleResult} />
        <BruteForce text={inputText} setResult={handleResult} />
        <FrequencyAnalysis text={inputText} setResult={handleResult} />

        {/* Result Display */}
        {result && (
          <div className="mt-4 p-4 bg-gray-600 border border-gray-500 rounded">
            <h2 className="text-xl font-semibold">Decoded Message:</h2>
            <p>{result}</p>
          </div>
        )}
      </div>

      {/* Message History Section */}
      <div className="w-full max-w-lg mt-8 p-4 bg-gray-700 rounded-lg shadow-lg">
        <h2 className="text-xl font-semibold mb-4">Message History</h2>
        <ul className="space-y-4">
          {history.length === 0 ? (
            <li>No history available.</li>
          ) : (
            history.map((entry, index) => (
              <li key={index} className="p-2 bg-gray-600 rounded">
                <p><strong>Message:</strong> {entry.text}</p>
                <p><strong>Timestamp:</strong> {entry.timestamp}</p>
              </li>
            ))
          )}
        </ul>

        {/* Clear History Button */}
        <button
          onClick={() => {
            setHistory([]);
            localStorage.removeItem('messageHistory');
          }}
          className="mt-4 p-2 bg-red-500 text-white rounded"
        >
          Clear History
        </button>
      </div>
    </div>
  );
}

export default App;

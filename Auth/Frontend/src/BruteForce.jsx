import React from 'react';

const BruteForce = ({ text, setResult }) => {
  const bruteForceDecryption = (cipherText) => {
    let possibleMessages = [];
    for (let shift = 1; shift <= 25; shift++) {
      let decodedMessage = caesarCipher(cipherText, -shift);
      possibleMessages.push(decodedMessage);
    }
    return possibleMessages;
  };

  const caesarCipher = (text, shift) => {
    return text
      .split('')
      .map((char) => {
        if (/[a-zA-Z]/.test(char)) {
          const offset = char === char.toLowerCase() ? 97 : 65;
          return String.fromCharCode(((char.charCodeAt(0) - offset + shift) % 26) + offset);
        }
        return char;
      })
      .join('');
  };

  const handleBruteForce = () => {
    const messages = bruteForceDecryption(text);
    setResult(messages.join('\n'));
  };

  return (
    <div className="my-4">
      <button onClick={handleBruteForce} className="p-2 bg-green-600 text-white rounded">Brute Force Decode</button>
    </div>
  );
};

export default BruteForce;

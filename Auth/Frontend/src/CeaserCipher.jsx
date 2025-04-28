import React from 'react';

const CaesarCipher = ({ text, shift, setResult }) => {
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

  const handleEncrypt = () => {
    setResult(caesarCipher(text, shift));
  };

  const handleDecrypt = () => {
    setResult(caesarCipher(text, -shift));
  };

  return (
    <div className="my-4">
      <button onClick={handleEncrypt} className="mr-2 p-2 bg-blue-600 text-white rounded">Encrypt</button>
      <button onClick={handleDecrypt} className="p-2 bg-red-600 text-white rounded">Decrypt</button>
    </div>
  );
};

export default CaesarCipher;

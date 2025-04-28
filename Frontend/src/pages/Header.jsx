import React from 'react';

const Header = () => {
  return (
    <header className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <h1 className="text-3xl font-extrabold tracking-wider">Goods Exchange</h1>
        <nav>
          <ul className="flex space-x-8 text-lg">
            <li>
              <a href="/" className="hover:text-gray-200 transition duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-200 transition duration-300">
                Features
              </a>
            </li>
            <li>
              <a href="#features" className="hover:text-gray-200 transition duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-gray-200 transition duration-300">
                About
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-gray-200 transition duration-300">
                Contact
              </a>
            </li>
            
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

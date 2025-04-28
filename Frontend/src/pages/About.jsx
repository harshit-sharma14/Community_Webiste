import React from 'react';

const About = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="container mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2">
            <h1 className="text-5xl font-bold mb-4">About Goods Exchange</h1>
            <p className="text-lg text-gray-100 mb-6">
              Goods Exchange is the ultimate platform for connecting communities. 
              We empower individuals to exchange goods and services while fostering 
              trust, sustainability, and convenience.
            </p>
            <a
              href="#mission"
              className="bg-white text-blue-600 py-3 px-6 rounded-md font-semibold hover:bg-gray-200 transition duration-300"
            >
              Learn More
            </a>
          </div>
          <div className="md:w-1/2 mt-8 md:mt-0">
            <img
              src="https://via.placeholder.com/500x300"
              alt="Community Exchange"
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>

      {/* Highlights Section */}
      <section id="mission" className="py-16 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            Why Choose Us
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
              <div className="text-blue-600 text-4xl mb-4">
                <i className="fas fa-leaf"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Sustainability</h3>
              <p className="text-gray-600">
                Reduce waste and promote a circular economy by trading what you no longer need.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
              <div className="text-purple-600 text-4xl mb-4">
                <i className="fas fa-handshake"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Trust</h3>
              <p className="text-gray-600">
                Build meaningful connections and exchange goods in a secure environment.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-6 shadow-md text-center">
              <div className="text-pink-600 text-4xl mb-4">
                <i className="fas fa-bolt"></i>
              </div>
              <h3 className="text-2xl font-semibold mb-2">Convenience</h3>
              <p className="text-gray-600">
                Enjoy a user-friendly platform designed for seamless exchanges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                "Goods Exchange has transformed the way I declutter and find useful items. It's an amazing platform!"
              </p>
              <h4 className="text-xl font-semibold text-gray-800">- Sarah Lee</h4>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <p className="text-gray-600 italic mb-4">
                "A perfect platform for sustainable living! I've saved money and made friends along the way."
              </p>
              <h4 className="text-xl font-semibold text-gray-800">- John Doe</h4>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;

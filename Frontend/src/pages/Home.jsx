import React from 'react';
import { useNavigate } from 'react-router-dom'; // If using React Router
import Footer from './Footer';
import Header from './Header';

const Home = () => {
  const navigate = useNavigate(); // React Router navigation hook

  const features = [
    {
      title: 'Goods Exchange',
      desc: 'List, trade, sell, or give away goods you no longer need.',
      icon: '💼',
      link: '/goodsView', // No navigation for this feature
    },
    {
      title: 'Services Section',
      desc: 'Offer or request services like tutoring, repairs, and freelancing.',
      icon: '🛠️',
      link: '/viewservices', // No navigation for this feature
    },
    {
      title: 'Admin Dashboard',
      desc: 'Manage users, approve listings, and moderate content effectively.',
      icon: '📊',
      link: '/admin', // Example path for navigation
    },
    {
      title: 'Forums',
      desc: 'Engage in discussions, share advice, and connect with the community.',
      icon: '💬',
      link: '/forum', // No navigation for this feature
    },
    {
      title: 'Nearby Shops',
      desc: 'Discover local businesses with shop details and special deals.',
      icon: '🏪',
      link: '/shops', // No navigation for this feature
    },
    
  ];

  return (
    <div className="flex flex-col min-h-screen">
         {/* Header Section */}
      <Header/>

{/* Hero Section */}
<section className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white py-20 text-center">
  
  <div className="container mx-auto px-4">
    <h1 className="text-4xl md:text-5xl font-bold tracking-wide">
      Welcome to Our Community Portal
    </h1>
    <p className="mt-4 text-lg max-w-2xl mx-auto">
      Empowering you to exchange goods, discover services, and connect with your community.
    </p>
    <button onClick={()=>navigate('/login')} className="mt-6 px-8 py-3 bg-white text-blue-700 font-semibold rounded-md shadow-md hover:bg-gray-200 transition transform hover:scale-105">
      Get Started
    </button>
  </div>
</section>

      {/* Features Section */}
      <section id='features' className="py-12 bg-gray-50">
        <div className="container mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-blue-500 to-blue-700 text-transparent bg-clip-text">
            Explore Our Features
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map(({ title, desc, icon, link }) => (
              <div
                key={title}
                className={`p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition transform hover:scale-105 ${
                  link ? 'cursor-pointer' : ''
                }`}
                onClick={() => link && navigate(link)} // Navigate on click
              >
                <div className="text-4xl mb-4">{icon}</div>
                <h3 className="text-xl font-semibold mb-2">{title}</h3>
                <p className="text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;

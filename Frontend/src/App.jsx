// src/App.jsx
import React, { useContext } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';


import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Addproduct from './pages/Addproduct';
import GoodsView from './pages/GoodsView';
import ViewGoods from './pages/ViewGoods';
import Navbar from './pages/Navbar';
import ServiceUpload from './pages/ServiceUpload';
import ViewServices from './pages/ViewServices';
import NearbyShops from './pages/NearbyShops';
import Forum from './pages/Forum';
import Home from './pages/Home';
import AdminPortal from './pages/AdminPortal';
import About from './pages/About';
import Contact from './pages/Contact'
// Private route for authenticated users

const App = () => {
  const user= useContext(AuthContext); // Use AuthContext to check user authentication status

  return (
    
      <div className="font-sans antialiased bg-gray-100">
        {/* Global Navigation Bar */}
        
        <div >
          <Navbar/>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<Dashboard/>} />
            <Route path="/addproduct" element={<Addproduct/>} />
            <Route path="/goodsview" element={<GoodsView/>} />
            <Route path="/viewgoods" element={<ViewGoods/>} />
            <Route path="/serviceupload" element={<ServiceUpload/>} />
            <Route path="/viewservices" element={<ViewServices/>} />
            <Route path="/forum" element={<Forum/>} />
            <Route path="/shops" element={<NearbyShops/>} />
            <Route path="/admin" element={<AdminPortal/>} />
            <Route path="/about" element={<About/>} />
            <Route path="/contact" element={<Contact/>} />
            {/* Private Routes (Only accessible when authenticated) */}
            
          </Routes>
        </div>
      </div>
   
  );
};

export default App;

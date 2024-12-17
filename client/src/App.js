import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './assets/pages/Home/Home.jsx';
import Services from './assets/pages/Services/Services.jsx';
import Booking from './assets/pages/Booking/Booking.jsx';
import Masters from './assets/pages/Masters/Masters.jsx';
import DatePicker from './assets/pages/DatePicker/DatePicker.jsx';
import MasterServices from './assets/pages/MasterServices/MasterServices.jsx';
import Auth from './assets/pages/Auth/auth.jsx';
import Register from './assets/pages/Register/Register.jsx';
import Reviews from './assets/pages/Reviews/Reviews.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/date-picker" element={<DatePicker />} />
        <Route path="/master-services/:id" element={<MasterServices />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        
      </Routes>
    </Router>
  );
};

export default App;

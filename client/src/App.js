import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Services from './pages/Services';
import Booking from './pages/Booking';
import Masters from './pages/Masters';
import DatePicker from './pages/DatePicker';
import MasterServices from './pages/MasterServices';
import Login from './pages/Login';
import Register from './pages/Register';
import Reviews from './pages/Reviews ';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/date-picker" element={<DatePicker />} />
        <Route path="/master-services/:id" element={<MasterServices />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
      </Routes>
    </Router>
  );
};

export default App;

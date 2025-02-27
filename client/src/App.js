import React, { useState, useEffect } from 'react';
import { Routes, Route, BrowserRouter , Navigate } from 'react-router-dom';
import Home from './assets/pages/Home/Home.jsx';
import Services from './assets/pages/Services/Services.jsx';
import Booking from './assets/pages/Booking/Booking.jsx';
import Masters from './assets/pages/Masters/Masters.jsx';
import DatePicker from './assets/pages/DatePicker/DatePicker.jsx';
import MasterServices from './assets/pages/MasterServices/MasterServices.jsx';
import Login from './assets/pages/Auth/auth.jsx';
import Register from './assets/pages/Register/Register.jsx';
import Reviews from './assets/pages/Reviews/Reviews.jsx';
import ProfilePage from './assets/pages/ProfilePage/ProfilePage.jsx';


const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Проверяем, есть ли данные о пользователе в localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);
  return (
    <BrowserRouter>
    <Routes>
    <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/masters" element={<Masters />} />
        <Route path="/date-picker" element={<DatePicker />} />
        <Route path="/masterServices/:id" element={<MasterServices />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/reviews" element={<Reviews />} />
        <Route path="/profilePage" element={user ? <ProfilePage user={user} /> : <Navigate to="/register" />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;

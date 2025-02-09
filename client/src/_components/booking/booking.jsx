import React from "react";
import { Link }from "react-router-dom";
import "./booking.css";

const Booking = () => {

  return (
    <div className="booking-container">
      <h1 className="booking-title">Новая запись</h1>
      <div className="booking">
      <div className="booking-links">
      <Link to="/services" className="booking-link" >
          Выбрать услуги
          </Link>
        </div>
        <div className="booking-links1">
        <Link to="/masters" className="booking-link">
          Выбрать мастера
          </Link>
      </div>
    </div>
    </div>
  );
};

export default Booking;

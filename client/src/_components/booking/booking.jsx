import React from "react";
import { Link }from "react-router-dom";
import "./booking.css";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";


const Booking = () => {

  const navigate = useNavigate();

  return (
    <div className="booking-container">
              <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <span style={{ fontSize: "24px" }}>{"<"}</span>
      </IconButton>
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

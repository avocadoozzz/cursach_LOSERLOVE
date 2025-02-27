import React from "react";
import { useNavigate } from "react-router-dom";
import BackgroundImage from "../../assets/img/Background.png";
import soobshenieImage from "../../assets/img/soobshenie.png";
import "./InfoBlock.css";

const InfoBlock = () => {
  const navigate = useNavigate(); // Хук для навигации

  const handleBookingClick = () => {
    navigate("/booking"); // Переход на страницу Booking
  };

  return (
    <div className="rect">
      <div className="main-image">
        <img src={BackgroundImage} alt="Background" />
      </div>
      <div className="info-block">
        <div className="main-">
        <a href="https://t.me/avocadooozzzz" target="_blank" rel="noopener noreferrer">
    <img src={soobshenieImage} alt="soobshenie" />
  </a>
        </div>
        <h2>LASER LOVE</h2>
        <p>📍 ул. Турова, д. 16</p>
        <h1>📞 +375 (44) *** ****</h1>
        <h3>🕒 Пн–Вс: с 09:00 до 21:00</h3>
        <h4>⭐ 5.0 (90 оценок)</h4>
        <button onClick={handleBookingClick}>Записаться</button>
      </div>
    </div>
  );
};

export default InfoBlock;

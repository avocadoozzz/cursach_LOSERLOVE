import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MasterCard.css';

const MasterCard = () => {
  const navigate = useNavigate(); // Хук для навигации

  const handleBookingClick = () => {
    navigate('/Masters'); // Переход на страницу Masters
  };

  return (
    <div className="rect">
     <div className="rect2">
    <div className="master-card">
      <h3>Мастер 1</h3>
      <div className="master-info">
        <p>Есения</p>
        <h1>Мастер</h1>
        <button className="master-button" onClick={handleBookingClick}>Записаться</button>
      </div>
    </div>
    </div>
    </div> 
  );
};

export default MasterCard;

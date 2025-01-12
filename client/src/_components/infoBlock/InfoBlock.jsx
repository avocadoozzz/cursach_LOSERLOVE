import React, { useState } from "react";
//import { useNavigate } from "react-router-dom";
import BackgroundImage from  '../../assets/img/Background.png';
import soobshenieImage from  '../../assets/img/soobshenie.png';
import './InfoBlock.css';

const InfoBlock = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [redirect, setRedirect] = useState(null);
  
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);
  
    const handleRedirect = (action) => {
      setRedirect(action);
      closeModal();
    };
  
    if (redirect === "register") {
      window.location.href = "/register"; // Страница регистрации
      return null;
    }
  
    if (redirect === "login") {
      window.location.href = "/login"; // Страница авторизации
      return null;
    }
  
  return (
    <>
  <div className="rect">
  <div className="main-image">
    <img src={BackgroundImage} alt="Background" />
    </div>
        <div className="info-block">
        <div className="main-">
    <img src={soobshenieImage} alt="soobshenie" />
    </div>
        <h2>LASER LOVE</h2>
        <p>📍 ул. Турова, д. 16</p>
        <h1>📞 +375 (44) *** ****</h1>
        <h3>🕒 Пн–Вс: с 09:00 до 21:00</h3>
        <h4>⭐ 5.0 (90 оценок)</h4>
        <button onClick={openModal}>Записаться</button>
        
  
    {isModalOpen && (
      <div className="modal-overlay" onClick={closeModal}>
        <div className="modal-content2" onClick={(e) => e.stopPropagation()}>
          <button className="close-button" onClick={closeModal}>
            ✖
          </button>
          <h2>Выберите действие</h2>
          <div className="modal-buttons">
            <button onClick={() => handleRedirect("register")}>
              Зарегистрироваться
            </button>
            <button onClick={() => handleRedirect("login")}>
              Войти
            </button>
          </div>
        </div>
      </div>
    )}
      </div>
    </div>
      </>
  );
};

export default InfoBlock;

import React, { useState } from "react";
import "./ServicesList.css";

const services = [
  { name: "Живот полностью", price: "30 BYN", time: "10 м" },
  { name: "Лицо", price: "30 BYN", time: "15 м" },
  { name: "Подмышки", price: "15 BYN", time: "10 м" },
  { name: "Классическое бикини", price: "20 BYN", time: "15 м" },
  { name: "Глубокое бикини", price: "30 BYN", time: "20 м" },
];

const ServicesList = () => {
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
    <div className="rect">
    <div className="services-list">
      <h3>Услуги</h3>
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <p>{service.name}</p>
          <p>
            {service.price} | {service.time}
          </p>
          <button onClick={openModal}>Записаться</button>
        </div>
      ))}

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
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
  );
};

export default ServicesList;

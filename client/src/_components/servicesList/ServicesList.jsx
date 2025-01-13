import React from "react";
import { useNavigate } from "react-router-dom"; // Импорт useNavigate для перехода
import "./ServicesList.css";

const services = [
  { name: "Живот полностью", price: "30 BYN", time: "10 м" },
  { name: "Лицо", price: "30 BYN", time: "15 м" },
  { name: "Подмышки", price: "15 BYN", time: "10 м" },
  { name: "Классическое бикини", price: "20 BYN", time: "15 м" },
  { name: "Глубокое бикини", price: "30 BYN", time: "20 м" },
];

const ServicesList = () => {
  const navigate = useNavigate(); // Хук для навигации

  const handleServicesClick = () => {
    navigate("/services"); // Переход на страницу Services
  };

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
            <button onClick={handleServicesClick}>Записаться</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesList;

import React from 'react';
import './ServicesList.css';

const services = [
  { name: 'Живот полностью', price: '30 BYN', time: '10 м' },
  { name: 'Лицо', price: '30 BYN', time: '15 м' },
  { name: 'Подмышки', price: '15 BYN', time: '10 м' },
  { name: 'Классическое бикини', price: '20 BYN', time: '15 м' },
  { name: 'Глубокое бикини', price: '30 BYN', time: '20 м' },
];

const ServicesList = () => {
  return (
    <div className="services-list">
      <h3>Услуги</h3>
      {services.map((service, index) => (
        <div key={index} className="service-item">
          <p>{service.name}</p>
          <p>{service.price} | {service.time}</p>
          <button>Записаться</button>
        </div>
      ))}
    </div>
  );
};

export default ServicesList;

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/services')
      .then((response) => setServices(response.data))
      .catch((error) => console.error('Error fetching services:', error));
  }, []);

  return (
    <div>
      <h1>Услуги</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name} - {service.price} BYN
            <Link to={`/master-services/${service.id}`}>Подробнее</Link>
          </li>
        ))}
      </ul>
      <Link to="/">На главную</Link>
    </div>
  );
};

export default Services;

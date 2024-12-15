import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MasterServices = () => {
  const { id } = useParams();
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/master-services/${id}`)
      .then((response) => setServices(response.data))
      .catch((error) => console.error('Error fetching master services:', error));
  }, [id]);

  return (
    <div>
      <h1>Услуги мастера</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            {service.name} - {service.price} BYN
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MasterServices;
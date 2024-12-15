import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Masters = () => {
  const [masters, setMasters] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/masters')
      .then((response) => setMasters(response.data))
      .catch((error) => console.error('Error fetching masters:', error));
  }, []);

  return (
    <div>
      <h1>Выбор мастера</h1>
      <ul>
        {masters.map(master => (
          <li key={master.id}>
            {master.name} - {master.specialty}
          </li>
        ))}
      </ul>
      <Link to="/">На главную</Link>
    </div>
  );
};

export default Masters;

import React from 'react';
import { Link } from 'react-router-dom';

const Booking = () => {
  return (
    <div>
      <h1>Запись</h1>
      <p>Выберите услугу, мастера и дату для записи.</p>
      <nav>
        <Link to="/services">Выбор услуг</Link>
        <Link to="/masters">Выбор мастера</Link>
        <Link to="/date-picker">Выбор даты</Link>
      </nav>
    </div>
  );
};

export default Booking;

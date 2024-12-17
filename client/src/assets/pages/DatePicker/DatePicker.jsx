import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DatePicker = () => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  const handleSubmit = () => {
    console.log('Выбрана дата и время:', selectedDate, selectedTime);
  };

  return (
    <div>
      <h1>Выбор даты и времени</h1>
      <label>
        Дата:
        <input 
          type="date" 
          value={selectedDate} 
          onChange={(e) => setSelectedDate(e.target.value)} 
        />
      </label>
      <label>
        Время:
        <input 
          type="time" 
          value={selectedTime} 
          onChange={(e) => setSelectedTime(e.target.value)} 
        />
      </label>
      <button onClick={handleSubmit}>Подтвердить</button>
      <Link to="/">На главную</Link>
    </div>
  );
};

export default DatePicker;
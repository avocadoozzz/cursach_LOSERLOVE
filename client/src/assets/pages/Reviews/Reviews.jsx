/*import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Получение списка отзывов с сервера
    axios.get('http://localhost:5000/api/reviews')
      .then((response) => setReviews(response.data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const handleAddReview = () => {
    if (!newReview || !userName) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const review = {
      userName,
      comment: newReview,
      date: new Date().toISOString(),
    };

    // Отправка нового отзыва на сервер
    axios.post('http://localhost:5000/api/reviews', review)
      .then((response) => {
        setReviews([...reviews, response.data]);
        setNewReview('');
        setUserName('');
      })
      .catch((error) => console.error('Error adding review:', error));
  };

  return (
    <div>
      <h1>Отзывы</h1>
      <div>
        <h2>Добавить отзыв</h2>
        <label>
          Ваше имя:
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </label>
        <label>
          Отзыв:
          <textarea 
            value={newReview} 
            onChange={(e) => setNewReview(e.target.value)} 
          />
        </label>
        <button onClick={handleAddReview}>Отправить</button>
      </div>
      <div>
        <h2>Отзывы клиентов</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p><strong>{review.userName}</strong> ({new Date(review.date).toLocaleDateString()}):</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Пока отзывов нет. Будьте первым!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;*/


import React, { useState, useEffect } from 'react';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState('');
  const [userName, setUserName] = useState('');
  const [rating, setRating] = useState(5); // Добавил рейтинг

  useEffect(() => {
    fetch('http://localhost:5000/api/reviews')
      .then((response) => response.json())
      .then((data) => setReviews(data))
      .catch((error) => console.error('Error fetching reviews:', error));
  }, []);

  const handleAddReview = () => {
    if (!newReview || !userName || !rating) {
      alert('Пожалуйста, заполните все поля.');
      return;
    }

    const review = {
      client_id: userName, // Нужно заменить на реальный ID клиента, если он есть
      master_id: 1, // Заглушка, замените на реального мастера
      rating,
      comment: newReview,
    };

    fetch('http://localhost:5000/api/reviews', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(review),
    })
      .then((response) => response.json())
      .then((data) => {
        setReviews([...reviews, data]);
        setNewReview('');
        setUserName('');
        setRating(5);
      })
      .catch((error) => console.error('Error adding review:', error));
  };

  return (
    <div>
      <h1>Отзывы</h1>
      <div>
        <h2>Добавить отзыв</h2>
        <label>
          Ваше имя:
          <input 
            type="text" 
            value={userName} 
            onChange={(e) => setUserName(e.target.value)} 
          />
        </label>
        <label>
          Рейтинг:
          <input 
            type="number" 
            value={rating} 
            min="1" 
            max="5" 
            onChange={(e) => setRating(Number(e.target.value))} 
          />
        </label>
        <label>
          Отзыв:
          <textarea 
            value={newReview} 
            onChange={(e) => setNewReview(e.target.value)} 
          />
        </label>
        <button onClick={handleAddReview}>Отправить</button>
      </div>
      <div>
        <h2>Отзывы клиентов</h2>
        {reviews.length > 0 ? (
          <ul>
            {reviews.map((review, index) => (
              <li key={index}>
                <p><strong>{review.client_id || 'Аноним'}</strong> ({new Date(review.date).toLocaleDateString()}):</p>
                <p>Рейтинг: {review.rating}/5</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Пока отзывов нет. Будьте первым!</p>
        )}
      </div>
    </div>
  );
};

export default Reviews;

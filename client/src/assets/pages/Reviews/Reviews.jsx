import React, { useState, useEffect } from 'react';
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

export default Reviews;

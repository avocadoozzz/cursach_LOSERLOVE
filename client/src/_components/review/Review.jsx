import React from 'react';
import { useNavigate } from "react-router-dom"; // Импорт useNavigate
import './Review.css';

const reviews = [
  { name: 'Taniy', date: '03 дек 2024', text: 'Есения лучший мастер!!!!' },
  { name: 'Светлана Соколова', date: '02 дек 2024', text: 'Хочу так же' },
  { name: 'olga nechaeva', date: '02 дек 2024', text: 'Очень понравилась студия и мастер Есения😊 и кофе вкусный' },
  { name: 'Васькович Олеся', date: '01 дек 2024', text: 'Все отлично! Есения прекрасный специалист 🥰🙌' },
];

const Reviews = () => {
  const navigate = useNavigate(); // Хук для навигации

  const handleShowMoreClick = () => {
    navigate("/reviews"); // Переход на страницу Reviews
  };
  
  return (
    <div className="rect">  
    <div className="reviews-container">
      <div className="reviews-header">
        <h3>Отзывы</h3>
        <div className="header-buttons">
          <button className="leave-review" onClick={() => navigate("/reviews")}>Оставить отзыв</button>
          <button className="report">Пожаловаться</button>
        </div>
      </div>
      <div className="rating-section">
        <span className="rating">⭐ 5.0 Рейтинг</span>
        <span className="total-reviews">90 Оценок</span>
        <div className="rating-bars">
          <div className="rating-bar">
            <div className="bar-fill" style={{ width: '100%' }}></div>
          </div>
          <div className="rating-bar">
            <div className="bar-fill" style={{ width: '0%' }}></div>
          </div>
          <div className="rating-bar">
            <div className="bar-fill" style={{ width: '0%' }}></div>
          </div>
          <div className="rating-bar">
            <div className="bar-fill" style={{ width: '0%' }}></div>
          </div>
          <div className="rating-bar">
            <div className="bar-fill" style={{ width: '0%' }}></div>
          </div>
        </div>
      </div>
      <div className="reviews-list">
        {reviews.map((review, index) => (
          <div key={index} className="review-item">
            <h4>{review.name}</h4>
            <p className="review-date">{review.date}</p>
            <p className="review-text">{review.text}</p>
            <button className="same-review">Хочу так же</button>
          </div>
        ))}
      </div>
      <button className="show-more" onClick={handleShowMoreClick}>Показать ещё</button>
    </div>
    </div>
  );
};

export default Reviews;

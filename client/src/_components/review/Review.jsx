import React from 'react';
import './Review.css';

const reviews = [
  { name: 'Taniy', date: '03 дек 2024', text: 'Есения лучший мастер!!!!' },
  { name: 'Светлана Соколова', date: '02 дек 2024', text: 'Хочу так же' },
  { name: 'olga nechaeva', date: '02 дек 2024', text: 'Очень понравилась студия и мастер Есения😊 и кофе вкусный' },
  { name: 'Васькович Олеся', date: '01 дек 2024', text: 'Все отлично! Есения прекрасный специалист 🥰🙌' },
];

const Reviews = () => {
  return (
    <div className="reviews">
      <h3>Отзывы</h3>
      <div className="rating">⭐ 5.0 | 90 Оценок</div>
      {reviews.map((review, index) => (
        <div key={index} className="review-item">
          <h4>{review.name}</h4>
          <p>{review.date}</p>
          <p>{review.text}</p>
        </div>
      ))}
      <button className="show-more">Показать ещё</button>
    </div>
  );
};

export default Reviews;

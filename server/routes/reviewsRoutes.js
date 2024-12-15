const express = require('express');
const { getReviews, addReview, deleteReview } = require('../controllers/reviewsController');

const router = express.Router();

router.get('/', getReviews); // Получение всех отзывов
router.post('/', addReview); // Добавление отзыва
router.delete('/:id', deleteReview); // Удаление отзыва по ID

module.exports = router;


const express = require('express');
const { getReviews, create, deleteReview, updateReview } = require('../controllers/reviewsController');

const router = express.Router();

router.get('/', getReviews); // Получение всех отзывов
router.post('/', create); // Добавление отзыва
router.delete('/:id', deleteReview); // Удаление отзыва по ID
router.delete('/:id', updateReview);

module.exports = router;


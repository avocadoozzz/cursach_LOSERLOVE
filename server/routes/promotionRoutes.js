const express = require('express');
const router = express.Router();
const {getPromotions,createPromotion,updatePromotion,deletePromotion
} = require('../controllers/promotionController');

// Получить список активных акций
router.get('/', getPromotions);
// Добавить новую акцию
router.post('/', createPromotion);
// Обновить акцию
router.put('/:id', updatePromotion);
// Удалить акцию
router.delete('/:id', deletePromotion);

module.exports = router;

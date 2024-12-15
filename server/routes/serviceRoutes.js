const express = require('express');
const { getServices, addService } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getServices); // Получение списка услуг
router.post('/', addService); // Добавление новой услуги

module.exports = router;

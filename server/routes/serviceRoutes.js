const express = require('express');
const { getServices, create } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getServices); // Получение списка услуг
router.post('/', create); // Добавление новой услуги
router.get('/:id', getServices);

module.exports = router;

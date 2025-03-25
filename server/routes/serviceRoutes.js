const express = require('express');
const { getServices, create, update, remove } = require('../controllers/serviceController');

const router = express.Router();

router.get('/', getServices); // Получение списка услуг
router.post('/', create); // Добавление новой услуги
router.get('/:id', getServices);
router.put('/:id', update); // Обновление услуги
router.delete('/:id', remove); // Удаление услуги

module.exports = router;

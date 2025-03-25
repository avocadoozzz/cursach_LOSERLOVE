const express = require('express');
const { getAvailableDates,addAvailableDate,updateAvailableDate,deleteAvailableDate } = require('../controllers/datePickerController');

const router = express.Router();

router.get('/', getAvailableDates); // Получение доступных дат
// Добавление новой даты или времени записи
router.post('/', addAvailableDate);
// Редактирование даты или времени записи
router.put('/:id', updateAvailableDate);
// Удаление даты или времени записи
router.delete('/:id', deleteAvailableDate);

module.exports = router;

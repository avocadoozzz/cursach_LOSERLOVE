const express = require('express');
const { getAvailableDates } = require('../controllers/datePickerController');

const router = express.Router();

router.get('/', getAvailableDates); // Получение доступных дат

module.exports = router;

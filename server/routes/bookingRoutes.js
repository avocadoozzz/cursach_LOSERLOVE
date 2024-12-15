const express = require('express');
const router = express.Router();
const { createBooking } = require('../controllers/bookingController');

// POST: Создание записи
router.post('/', createBooking);

module.exports = router;

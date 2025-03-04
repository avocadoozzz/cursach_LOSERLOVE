const express = require('express');
const router = express.Router();
const { createBooking , getUserBookings } = require('../controllers/bookingController');

// POST: Создание записи
router.post('/', createBooking);
router.get('/all ', getUserBookings)

module.exports = router;

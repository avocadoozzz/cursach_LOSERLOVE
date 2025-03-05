const express = require('express');
const router = express.Router();
const { create , getUserBookings } = require('../controllers/bookingController');

// POST: Создание записи
router.post('/', create);
router.get('/all ', getUserBookings)

module.exports = router;

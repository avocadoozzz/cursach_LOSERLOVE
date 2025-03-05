const express = require('express');
const {  loginUser} = require('../controllers/authController');

const router = express.Router();

// Маршрут для входа
router.post('/', loginUser);

module.exports = router;

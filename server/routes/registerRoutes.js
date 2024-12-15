const express = require('express');
const router = express.Router();
const { registerUser } = require('../controllers/registerController');

// POST: Регистрация нового пользователя
router.post('/', registerUser);

module.exports = router;

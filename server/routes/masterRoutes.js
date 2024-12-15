const express = require('express');
const { getMasters } = require('../controllers/masterController');

const router = express.Router();

router.get('/', getMasters); // Получение списка мастеров

module.exports = router;

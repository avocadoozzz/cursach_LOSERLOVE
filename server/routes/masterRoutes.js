const express = require('express');
const { getMasters, create } = require('../controllers/masterController');

const router = express.Router();

router.get('/', getMasters); // Получение списка мастеров
router.post('/',create);

module.exports = router;

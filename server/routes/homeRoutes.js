const express = require('express');
const router = express.Router();
const { getHomePageData } = require('../controllers/homeController');

// GET: Данные для главной страницы
router.get('/', getHomePageData);

module.exports = router;

const express = require('express');
const router = express.Router();
const { getMasterServices } = require('../controllers/masterServicesController');

// GET: Получить услуги мастера
router.get('/:masterId', getMasterServices);

module.exports = router;

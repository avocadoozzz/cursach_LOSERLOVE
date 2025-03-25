const express = require('express');
const router = express.Router();
const { createMasterReport } = require('../controllers/masterReportController');

// POST: Создать отчет по мастерам
router.post('/generate', createMasterReport);

module.exports = router;

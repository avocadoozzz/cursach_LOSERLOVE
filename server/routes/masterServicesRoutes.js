const express = require('express');
const router = express.Router();
const { getMasterServices,  addMasterService,updateMasterService,deleteMasterService, } = require('../controllers/masterServicesController');

// GET: Получить услуги мастера
router.get('/:masterId', getMasterServices);
router.post('/:masterId', addMasterService); // Добавление новой услуги мастеру
router.put('/:serviceId', updateMasterService); // Редактирование услуги мастера
router.delete('/:serviceId', deleteMasterService); // Удаление услуги мастера

module.exports = router;

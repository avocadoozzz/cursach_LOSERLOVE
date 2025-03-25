const express = require('express');
const { getMasters, createMaster, updateMaster, deleteMaster } = require('../controllers/masterController');

const router = express.Router();

router.get('/', getMasters); // Получение списка мастеров
// Добавление нового мастера
router.post('/', createMaster);
// Редактирование мастера
router.put('/:id', updateMaster);
// Удаление мастера
router.delete('/:id', deleteMaster);

module.exports = router;

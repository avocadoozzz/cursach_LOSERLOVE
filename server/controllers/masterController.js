const pool = require('../db/db');
const { Master} = require('../models/models');

// Получение списка мастеров
const getMasters = async (req, res) => {
  try {
    const result = await Master.findAll(); // Получаем списка услуг
    return res.json(result);
} catch (error) {
    console.error('Ошибка при получении списка мастеров:', error);
    return res.status(500).json({ message: 'Ошибка при получении списка мастеров' });
}
};

// Добавление услуги
const create = async (req, res) => {

  try {
    const { username, email, password } = req.body;
    const master = await Master.create({ username, email, password  });
    return res.status(201).json(master);
} catch (error) {
  console.error('Error details:', error);
  res.status(500).json({ error: 'Ошибка при добавлении услуги', details: error.message });
}
};

module.exports = { getMasters,create};

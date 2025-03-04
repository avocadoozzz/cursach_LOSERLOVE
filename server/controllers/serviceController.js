const pool = require('../db/db');
const { Service} = require('../models/models');

// Получение списка услуг
const getServices = async (req, res) => {
  try {
    const result = await Service.findAll(); // Получаем списка услуг
    return res.json(result);
} catch (error) {
    console.error('Ошибка при получении списка услуг:', error);
    return res.status(500).json({ message: 'Ошибка при получении списка услуг' });
}
};

// Добавление услуги
const create = async (req, res) => {

  try {
    const { name, description, time } = req.body;
    const service = await Service.create({ name, description, time  });
    return res.status(201).json(service);
} catch (error) {
  console.error('Error details:', error);
  res.status(500).json({ error: 'Ошибка при добавлении услуги', details: error.message });
}
};

module.exports = { getServices, create };

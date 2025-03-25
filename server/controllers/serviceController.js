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

// Обновление услуги
const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, description, time } = req.body;
    
    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Услуга не найдена' });
    }

    await service.update({ name, description, time });
    return res.json(service);
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Ошибка при обновлении услуги', details: error.message });
  }
};

// Удаление услуги
const remove = async (req, res) => {
  try {
    const { id } = req.params;

    const service = await Service.findByPk(id);
    if (!service) {
      return res.status(404).json({ error: 'Услуга не найдена' });
    }

    await service.destroy();
    return res.json({ message: 'Услуга успешно удалена' });
  } catch (error) {
    console.error('Error details:', error);
    res.status(500).json({ error: 'Ошибка при удалении услуги', details: error.message });
  }
};

module.exports = { getServices, create, update, remove };


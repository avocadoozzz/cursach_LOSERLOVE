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

// Добавление нового мастера
const createMaster = async (req, res) => {
  try {
    const { name, specialization, experience } = req.body;
    const newMaster = await Master.create({ name, specialization, experience });
    return res.status(201).json(newMaster);
  } catch (error) {
    console.error('Ошибка при добавлении мастера:', error);
    return res.status(500).json({ message: 'Ошибка при добавлении мастера' });
  }
};

// Редактирование данных мастера
const updateMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, specialization, experience } = req.body;

    const master = await Master.findByPk(id);
    if (!master) {
      return res.status(404).json({ message: 'Мастер не найден' });
    }

    master.name = name || master.name;
    master.specialization = specialization || master.specialization;
    master.experience = experience || master.experience;

    await master.save();
    return res.json(master);
  } catch (error) {
    console.error('Ошибка при обновлении мастера:', error);
    return res.status(500).json({ message: 'Ошибка при обновлении мастера' });
  }
};

// Удаление мастера
const deleteMaster = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Master.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).json({ message: 'Мастер не найден' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении мастера:', error);
    return res.status(500).json({ message: 'Ошибка при удалении мастера' });
  }
};

module.exports = { getMasters,createMaster, updateMaster, deleteMaster};

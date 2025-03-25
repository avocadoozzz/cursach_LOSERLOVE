const { Promotion } = require('../models/models');

// Получение списка всех активных акций
const getPromotions = async (req, res) => {
  try {
    const promotions = await Promotion.findAll({
      where: { endDate: { $gte: new Date() } }, // Только активные акции
    });
    return res.json(promotions);
  } catch (error) {
    console.error('Ошибка при получении акций:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Добавление новой акции
const createPromotion = async (req, res) => {
  try {
    const { title, description, discount, startDate, endDate } = req.body;
    const promotion = await Promotion.create({ title, description, discount, startDate, endDate });
    return res.status(201).json(promotion);
  } catch (error) {
    console.error('Ошибка при создании акции:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Обновление акции
const updatePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, discount, startDate, endDate } = req.body;

    const updatedPromotion = await Promotion.update(
      { title, description, discount, startDate, endDate },
      { where: { id }, returning: true }
    );

    if (!updatedPromotion[1].length) {
      return res.status(404).json({ message: 'Акция не найдена' });
    }

    return res.json(updatedPromotion[1][0]);
  } catch (error) {
    console.error('Ошибка при обновлении акции:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление акции
const deletePromotion = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedPromotion = await Promotion.destroy({ where: { id } });

    if (!deletedPromotion) {
      return res.status(404).json({ message: 'Акция не найдена' });
    }

    return res.status(204).send();
  } catch (error) {
    console.error('Ошибка при удалении акции:', error);
    return res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getPromotions, createPromotion, updatePromotion, deletePromotion };

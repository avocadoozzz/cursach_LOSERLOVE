const pool = require('../db/db');
const { Review } = require('../models/models');


// Получение всех отзывов
const getReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll(); // Получаем все отзывы
    return res.json(reviews);
} catch (error) {
    console.error('Ошибка при получении отзывов:', error);
    return res.status(500).json({ message: 'Ошибка при получении отзывов' });
}
};

// Добавление нового отзыва
const addReview = async (req, res) => {

  try {
    const { client_id, master_id, rating, comment } = req.body;
    console.log(req.body); // Проверьте, что все поля присутствуют
            const reviews = await Review.addReview({client_id, master_id, rating, comment });
            return res.status(201).json(reviews);
        } catch (error) {
            console.error('Ошибка при создании отзыва:', error);
            return res.status(500).json({ message: 'Ошибка при создании отзыва' });
        }
};

// Удаление отзыва
const deleteReview = async (req, res) => {

  try {
    const { id } = req.params; // Получаем id из параметров
    const deletedReview = await Review.destroy({
        where: { id: id }
    });

    if (!deletedReview) {
        return res.status(404).json({ message: 'Отзыв не найден' });
    }

    return res.status(204).send(); // Успешное удаление, без содержимого
} catch (error) {
    console.error('Ошибка при удалении отзыва:', error);
    return res.status(500).json({ message: 'Ошибка при удалении отзыва' });
}
}
module.exports = { getReviews, addReview, deleteReview };

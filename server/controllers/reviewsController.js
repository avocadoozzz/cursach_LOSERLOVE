const pool = require('../db/db');

// Получение всех отзывов
const getReviews = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM reviews');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Добавление нового отзыва
const addReview = async (req, res) => {
  const { user_id, content, rating } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO reviews (user_id, content, rating) VALUES ($1, $2, $3) RETURNING *',
      [user_id, content, rating]
    );
    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление отзыва
const deleteReview = async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getReviews, addReview, deleteReview };

const pool = require('../db/db');

// Получение списка мастеров
const getMasters = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM masters');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getMasters };

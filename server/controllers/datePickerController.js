const pool = require('../db/db');

// Получение доступных дат
const getAvailableDates = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM available_dates');
    res.json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getAvailableDates };

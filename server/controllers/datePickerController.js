const pool = require('../db/db');
const { datePicker } = require('../models/models');

// Получение доступных дат
const getAvailableDates = async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM available_dates');
    res.json(result.rows);
  } catch (error) {
    console.error('Ошибка при получении доступных дат:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Добавление новой даты или времени записи
const addAvailableDate = async (req, res) => {
  try {
    const { date, time } = req.body;
    const newDate = await pool.query(
      'INSERT INTO available_dates (date, time) VALUES ($1, $2) RETURNING *',
      [date, time]
    );
    res.status(201).json(newDate.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении даты:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Редактирование даты или времени записи
const updateAvailableDate = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, time } = req.body;

    const updatedDate = await pool.query(
      'UPDATE available_dates SET date = $1, time = $2 WHERE id = $3 RETURNING *',
      [date, time, id]
    );

    if (updatedDate.rows.length === 0) {
      return res.status(404).json({ message: 'Дата не найдена' });
    }

    res.json(updatedDate.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении даты:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

// Удаление даты или времени записи
const deleteAvailableDate = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedDate = await pool.query('DELETE FROM available_dates WHERE id = $1 RETURNING *', [id]);

    if (deletedDate.rows.length === 0) {
      return res.status(404).json({ message: 'Дата не найдена' });
    }

    res.status(204).send(); // Успешное удаление
  } catch (error) {
    console.error('Ошибка при удалении даты:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
  }
};

module.exports = { getAvailableDates, addAvailableDate, updateAvailableDate, deleteAvailableDate };

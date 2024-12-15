const pool = require('../db/db');

// Создание записи
const createBooking = async (req, res) => {
  const { userId, serviceId, masterId, date, time } = req.body;

  try {
    await pool.query(
      'INSERT INTO bookings (user_id, service_id, master_id, booking_date, booking_time) VALUES ($1, $2, $3, $4, $5)',
      [userId, serviceId, masterId, date, time]
    );
    res.status(201).json({ message: 'Запись успешно создана' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при создании записи' });
  }
};

// Получение всех записей пользователя
const getUserBookings = async (req, res) => {
  const { userId } = req.params;

  try {
    const result = await pool.query(
      'SELECT * FROM bookings WHERE user_id = $1',
      [userId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении записей пользователя' });
  }
};

module.exports = { createBooking, getUserBookings };

const pool = require('../db/db');
const { Appointment} = require('../models/models');

// Создание записи
const create = async (req, res) => {

  try {
    const {  user_id, service_id, master_id, date, time } = req.body;
    const user = await Appointment.create({ user_id, service_id, master_id, date, time  });
    return res.status(201).json(user);
} catch (error) {
  console.error('Error details:', error);
  res.status(500).json({ error: 'Ошибка при добавлении услуги', details: error.message });
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

module.exports = { create, getUserBookings };

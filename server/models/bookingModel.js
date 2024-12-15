const pool = require('../db/db');

// Создать новую запись (бронь)
const createBooking = async (clientId, masterId, serviceId, date, time) => {
  try {
    const result = await pool.query(
      'INSERT INTO bookings (client_id, master_id, service_id, booking_date, booking_time) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [clientId, masterId, serviceId, date, time]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при создании записи:', error);
    throw error;
  }
};

// Получить все записи
const getBookings = async () => {
  try {
    const result = await pool.query('SELECT * FROM bookings');
    return result.rows;
  } catch (error) {
    console.error('Ошибка при получении записей:', error);
    throw error;
  }
};

// Получить запись по ID
const getBookingById = async (id) => {
  try {
    const result = await pool.query('SELECT * FROM bookings WHERE id = $1', [id]);
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при получении записи по ID:', error);
    throw error;
  }
};

module.exports = { createBooking, getBookings, getBookingById };

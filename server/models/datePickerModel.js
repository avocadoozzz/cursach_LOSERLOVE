const pool = require('../db/db');

const fetchAvailableDates = async () => {
  const result = await pool.query('SELECT * FROM available_dates');
  return result.rows;
};

module.exports = { fetchAvailableDates };

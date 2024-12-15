const pool = require('../db/db');

const fetchAllServices = async () => {
  const result = await pool.query('SELECT * FROM services');
  return result.rows;
};

const createService = async (name, price) => {
  const result = await pool.query(
    'INSERT INTO services (name, price) VALUES ($1, $2) RETURNING *',
    [name, price]
  );
  return result.rows[0];
};

module.exports = { fetchAllServices, createService };

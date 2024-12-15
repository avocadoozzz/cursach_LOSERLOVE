const pool = require('../db/db');

const fetchAllMasters = async () => {
  const result = await pool.query('SELECT * FROM masters');
  return result.rows;
};

module.exports = { fetchAllMasters };

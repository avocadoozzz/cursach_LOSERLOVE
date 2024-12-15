const pool = require('../db/db');

const createUser = async (username, password) => {
  const result = await pool.query(
    'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id, username',
    [username, password]
  );
  return result.rows[0];
};

const findUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

module.exports = { createUser, findUserByUsername };

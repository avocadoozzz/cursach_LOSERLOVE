const pool = require('../db/db');

// Зарегистрировать нового пользователя
const registerUser = async (username, password, email) => {
  try {
    const result = await pool.query(
      'INSERT INTO users (username, password, email) VALUES ($1, $2, $3) RETURNING id, username, email',
      [username, password, email]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при регистрации пользователя:', error);
    throw error;
  }
};

// Проверить, существует ли пользователь с таким именем или email
const checkUserExists = async (username, email) => {
  try {
    const result = await pool.query(
      'SELECT * FROM users WHERE username = $1 OR email = $2',
      [username, email]
    );
    return result.rows.length > 0;
  } catch (error) {
    console.error('Ошибка при проверке существования пользователя:', error);
    throw error;
  }
};

module.exports = { registerUser, checkUserExists };
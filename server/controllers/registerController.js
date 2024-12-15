const pool = require('../db/db');
const bcrypt = require('bcrypt');

// Регистрация пользователя
const registerUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2)',
      [username, hashedPassword]
    );
    res.status(201).json({ message: 'Пользователь зарегистрирован успешно' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя' });
  }
};

module.exports = { registerUser };

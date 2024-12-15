const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Авторизация пользователя
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
    const user = result.rows[0];

    if (!user) {
      return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Неверное имя пользователя или пароль' });
    }

    const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ token, message: 'Авторизация успешна' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при авторизации' });
  }
};

// Проверка токена
const checkAuth = (req, res) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Токен отсутствует' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    res.status(200).json({ userId: decoded.userId });
  } catch (error) {
    console.error(error);
    res.status(401).json({ error: 'Неверный токен' });
  }
};

module.exports = { loginUser, checkAuth };
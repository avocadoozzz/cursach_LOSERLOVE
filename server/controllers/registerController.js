const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');

// Регистрация пользователя
const registerUser = async (req, res) => {
  try {
    // Логирование тела запроса
    console.log('Received data:', req.body);

    const { username, password, email, dateofbirth } = req.body;

    // Проверка на существование пользователя с таким именем или email
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: 'Пользователь с таким email уже существует' });
    }

    // Хеширование пароля перед сохранением
    const hashedPassword = await bcrypt.hash(password, 10);

    // Создание пользователя с хешированным паролем
    const register = await User.create({ username, password: hashedPassword, email, dateofbirth });

    // Возвращение успешного ответа
    return res.status(201).json({ message: 'Пользователь успешно зарегистрирован', user: register });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя', details: error.message });
  }
};

module.exports = { registerUser };

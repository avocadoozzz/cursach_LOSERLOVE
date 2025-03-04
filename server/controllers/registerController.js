const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { User} = require('../models/models');

// Регистрация пользователя
const registerUser = async (req, res) => {
  
  try {
    // Логирование тела запроса
    console.log('Received data:', req.body);

    const { username, password , email, is_master ,dateofbirth } = req.body;
    console.log(req.body);
    const register = await User.create({ username, password , email, is_master ,dateofbirth  });
    return res.status(201).json(register);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при регистрации пользователя', details: error.message  });
  }
};


module.exports = { registerUser };

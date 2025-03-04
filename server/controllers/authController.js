const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// Авторизация пользователя
const loginUser = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ where: { username } });
    console.log(user)
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (password !== user.password) {
        return res.status(401).json({ message: 'Неверный пароль' });
    }


    if (user.isBlocked) {
        console.error('Пользователь заблокирован:', user.name);
        return res.status(401).json({ message: 'Вы заблокированы. Вход невозможен.' });
    }

    res.status(200).json({  name: user.name,  
                            email: user.email,  
                            client_id: user.client_id, 
                            dob: user.dob,
                            role: user.role}); 
} catch (error) {
    console.error('Ошибка при аутентификации:', error);
    res.status(500).json({ message: 'Ошибка сервера' });
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

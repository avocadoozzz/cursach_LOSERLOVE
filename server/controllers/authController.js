/*const pool = require('../db/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../models/models');

// Авторизация пользователя
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    console.log(user)
    if (!user) {
        return res.status(404).json({ message: 'Пользователь не найден' });
    }

    if (password !== user.password) {
        return res.status(401).json({ message: 'Неверный пароль' });
    }


    if (user.isBlocked) {
        console.error('Пользователь заблокирован:', user.username);
        return res.status(401).json({ message: 'Вы заблокированы. Вход невозможен.' });
    }

    res.status(200).json({  username: user.username,  
                            email: user.email,  
                            client_id: user.client_id, 
                            dateofbirth: user.dateofbirth,
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
*/

const pool = require('../db/db');
const bcrypt = require('bcrypt');
const { User } = require('../models/models');
const jwt = require('jsonwebtoken');

// Авторизация пользователя
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const bcrypt = require('bcryptjs');

    
    // Поиск пользователя по email
    const user = await User.findOne({ where: { email } });
    if (!user) {
      console.error('Пользователь не найден:', email);
      return res.status(404).json({ message: 'Пользователь не найден' });
    }
    console.log('Полученный пароль:', req.body.password);

    // Проверка пароля
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error('Неверный пароль для пользователя:', email);
      return res.status(401).json({ message: 'Неверный пароль' });
    }

    // Проверка блокировки пользователя
    if (user.isBlocked) {
      console.error('Пользователь заблокирован:', user.username);
      return res.status(401).json({ message: 'Вы заблокированы. Вход невозможен.' });
    }
       // Генерация JWT
       const secretKey = process.env.JWT_SECRET_KEY || 'your-secret-key'; // ключ для подписания
       const token = jwt.sign({ id: user.id, email: user.email }, secretKey, { expiresIn: '1h' });
   
       // Возвращение успешного ответа
       return res.status(200).json({ message: 'Вход успешен', token });
     } 
     catch (error) {
       console.error(error);
       return res.status(500).json({ error: 'Ошибка при входе', details: error.message });
     }
    

    // Успешная авторизация
    res.status(200).json({
      success: true,
      message: 'Авторизация успешна',
      user: {
      username: user.username,
      email: user.email,
      password:user.password,
      client_id: user.client_id,
      dateofbirth: user.dateofbirth,
      role: user.role,
    },
    });
 //} catch (error) {
  //  console.error('Ошибка при аутентификации:', error);
  //  res.status(500).json({ message: 'Ошибка сервера', error: error.message });
  
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
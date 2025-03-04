require('dotenv').config();
const express = require("express");
const sequelize = require('./db/db');
const models = require('./models/models');
// Запуск сервера
const PORT = process.env.PORT || 3000;
const cors = require("cors");
const app = express();
const router = require('./routes/index')


app.use(cors());
// Middleware для обработки JSON
app.use(express.json());

//app.use('/api',router)

app.get('/' ,(req, res) => {
  res.status(200).json({ message: "Запрашиваемый ресурс найден" });
});


// API для получения информации о студии
app.get('/api/home', async (req, res) => {
  try {
    const result = await models.authModels.findOne();  // Предположим, что у вас есть такая модель StudioInfo
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});



// Импорт маршрутов
const authRoutes = require("./routes/authRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const masterServicesRoutes = require("./routes/masterServicesRoutes");
const registerRoutes = require("./routes/registerRoutes");
const homeRoutes = require("./routes/homeRoutes");
const datePickerRoutes = require("./routes/datePickerRoutes");
const masterRoutes = require("./routes/masterRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const reviewsRoutes = require("./routes/reviewsRoutes");

// Подключение маршрутов к серверу
app.use('/api/auth', authRoutes);
app.use('/api/booking', bookingRoutes);
app.use('/api/masterServices', masterServicesRoutes);
app.use('/api/register', registerRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/datePicker', datePickerRoutes);
app.use('/api/masters', masterRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/reviews', reviewsRoutes);
app.use('/api', router);

const start = async () => {
  try {
      await sequelize.authenticate();
      console.log('Соединение с базой данных успешно!');
      await sequelize.sync(); 
      app.listen(PORT, () => {
          console.log(`Server running at http://localhost:${PORT}`);
      });
  } catch (e) {
      console.error('Ошибка при подключении к базе данных:', e);
  }
};

start();
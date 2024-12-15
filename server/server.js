const express = require("express");
const app = express();
const cors = require("cors");
const { Pool } = require('pg');
require('dotenv').config();

// Middleware для обработки JSON
// app.use(cors());
app.use(express.json());
// Разрешаем доступ с порта 3000
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

// Создание пула подключений к базе данных PostgreSQL
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

// Проверка подключения к базе данных
pool.connect((err) => {
  if (err) {
    console.error("Ошибка подключения к базе данных:", err.stack);
  } else {
    console.log("Подключение к базе данных установлено");
  }
});

// API для получения информации о студии
app.get('/api/studio', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM studio_info LIMIT 1');
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

// API для получения списка услуг
app.get("/api/services", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM services");
    res.json(result.rows);
  } catch (error) {
    console.error("Ошибка при получении списка услуг:", error.message);
    res.status(500).send("Server error");
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
app.use("/api/auth.Api", authRoutes);
app.use("/api/booking.Api", bookingRoutes);
app.use("/api/masterServices.Api", masterServicesRoutes);
app.use("/api/register", registerRoutes);
app.use("/api/home", homeRoutes);
app.use("/api/datePicker", datePickerRoutes);
app.use("/api/master", masterRoutes);
app.use("/api/service", serviceRoutes);
app.use("/api/reviews", reviewsRoutes);

// Обработка необработанных маршрутов
app.use((req, res) => {
  res.status(404).send({ error: "Запрашиваемый ресурс не найден" });
});

// Запуск сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

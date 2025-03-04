require('dotenv').config();
const { Sequelize } = require('sequelize');

// Проверь, чтобы параметры были правильными
const sequelize = new Sequelize('lazerlove', 'postgres', '123456789', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;

const pool = require('../db/db');

// Получить информацию для главной страницы
const getHomePageData = async () => {
  try {
    const result = await pool.query('SELECT * FROM studio_info');
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при получении данных для главной страницы:', error);
    throw error;
  }
};

// Получить популярные услуги для отображения на главной странице
const getPopularServices = async () => {
  try {
    const result = await pool.query(
      'SELECT * FROM services ORDER BY popularity DESC LIMIT 5'
    );
    return result.rows;
  } catch (error) {
    console.error('Ошибка при получении популярных услуг:', error);
    throw error;
  }
};

module.exports = { getHomePageData, getPopularServices };
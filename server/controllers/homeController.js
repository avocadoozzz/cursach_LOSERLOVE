const pool = require('../db/db');

// Получение информации для главной страницы
const getHomePageData = async (req, res) => {
  try {
    const studioInfo = await pool.query('SELECT * FROM studio_info LIMIT 1');
    const services = await pool.query('SELECT * FROM services LIMIT 3');

    res.status(200).json({
      studio: studioInfo.rows[0],
      featuredServices: services.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при загрузке главной страницы' });
  }
};

module.exports = { getHomePageData };

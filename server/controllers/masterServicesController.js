const pool = require('../db/db');
const { masterService} = require('../models/models');

// Получение услуг, предоставляемых мастером
const getMasterServices = async (req, res) => {

  try {

    const { masterId } = req.params;
    const result = await pool.query(
      'SELECT * FROM services WHERE master_id = $1',
      [masterId]
    );
    res.status(200).json(result.rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Ошибка при получении услуг мастера' });
  }
};

module.exports = { getMasterServices };

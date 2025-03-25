const pool = require('../db/db');
const { MasterService} = require('../models/models');

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
// Добавление новой услуги мастеру
const addMasterService = async (req, res) => {
  try {
    const { masterId } = req.params;
    const { name, description, time, price } = req.body;

    const result = await pool.query(
      'INSERT INTO services (master_id, name, description, time, price) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [masterId, name, description, time, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при добавлении услуги мастеру:', error);
    res.status(500).json({ error: 'Ошибка при добавлении услуги' });
  }
};

// Редактирование услуги мастера
const updateMasterService = async (req, res) => {
  try {
    const { serviceId } = req.params;
    const { name, description, time, price } = req.body;

    const result = await pool.query(
      'UPDATE services SET name = $1, description = $2, time = $3, price = $4 WHERE id = $5 RETURNING *',
      [name, description, time, price, serviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    res.json(result.rows[0]);
  } catch (error) {
    console.error('Ошибка при обновлении услуги мастера:', error);
    res.status(500).json({ error: 'Ошибка при обновлении услуги' });
  }
};

// Удаление услуги мастера
const deleteMasterService = async (req, res) => {
  try {
    const { serviceId } = req.params;

    const result = await pool.query(
      'DELETE FROM services WHERE id = $1 RETURNING *',
      [serviceId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ message: 'Услуга не найдена' });
    }

    res.status(204).send(); // Успешное удаление
  } catch (error) {
    console.error('Ошибка при удалении услуги мастера:', error);
    res.status(500).json({ error: 'Ошибка при удалении услуги' });
  }
};

module.exports = { getMasterServices, addMasterService, updateMasterService, deleteMasterService };

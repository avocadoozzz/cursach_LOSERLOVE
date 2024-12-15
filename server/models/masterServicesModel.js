const pool = require('../db/db');

// Получить все услуги мастера
const getMasterServices = async (masterId) => {
  try {
    const result = await pool.query(
      'SELECT * FROM services WHERE master_id = $1',
      [masterId]
    );
    return result.rows;
  } catch (error) {
    console.error('Ошибка при получении услуг мастера:', error);
    throw error;
  }
};

// Добавить новую услугу мастеру
const addMasterService = async (masterId, serviceName, price) => {
  try {
    const result = await pool.query(
      'INSERT INTO services (master_id, service_name, price) VALUES ($1, $2, $3) RETURNING *',
      [masterId, serviceName, price]
    );
    return result.rows[0];
  } catch (error) {
    console.error('Ошибка при добавлении услуги мастеру:', error);
    throw error;
  }
};

// Удалить услугу мастера
const deleteMasterService = async (serviceId) => {
  try {
    await pool.query('DELETE FROM services WHERE id = $1', [serviceId]);
    return { message: 'Услуга успешно удалена' };
  } catch (error) {
    console.error('Ошибка при удалении услуги мастера:', error);
    throw error;
  }
};

module.exports = { getMasterServices, addMasterService, deleteMasterService };
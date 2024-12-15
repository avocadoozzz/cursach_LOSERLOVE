const pool = require('../db/db');

const fetchAllReviews = async () => {
  const result = await pool.query('SELECT * FROM reviews');
  return result.rows;
};

const createReview = async (user_id, content, rating) => {
  const result = await pool.query(
    'INSERT INTO reviews (user_id, content, rating) VALUES ($1, $2, $3) RETURNING *',
    [user_id, content, rating]
  );
  return result.rows[0];
};

const removeReview = async (id) => {
  await pool.query('DELETE FROM reviews WHERE id = $1', [id]);
};

module.exports = { fetchAllReviews, createReview, removeReview };

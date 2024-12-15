import apiConfig from "../apiConfig";

// Получение списка отзывов
export const getReviews = async () => {
  try {
    const response = await м.get('/reviews');
    return response.data;
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
};

// Добавление нового отзыва
export const addReview = async (review) => {
  try {
    const response = await apiConfig.post('/reviews', review);
    return response.data;
  } catch (error) {
    console.error('Error adding review:', error);
    throw error;
  }
};

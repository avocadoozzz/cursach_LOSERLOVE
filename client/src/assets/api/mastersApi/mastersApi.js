import apiConfig from './apiConfig';

// Получение списка мастеров
export const getMasters = async () => {
  try {
    const response = await apiConfig.get('/masters');
    return response.data;
  } catch (error) {
    console.error('Error fetching masters:', error);
    throw error;
  }
};

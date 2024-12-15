import apiConfig from './apiConfig';

// Получение основных данных для главной страницы
export const getHomePageData = async () => {
  try {
    const response = await apiConfig.get('/home');
    return response.data;
  } catch (error) {
    console.error('Error fetching home page data:', error);
    throw error;
  }
};

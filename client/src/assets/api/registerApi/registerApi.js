import apiConfig from './apiConfig';

// Регистрация нового пользователя
export const registerUser = async (userData) => {
  try {
    const response = await apiConfig.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

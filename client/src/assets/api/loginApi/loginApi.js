import apiConfig from './apiConfig';

// Логин пользователя
export const loginUser = async (credentials) => {
  try {
    const response = await apiConfig.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

import apiConfig from "../apiConfig";

// Авторизация пользователя
export const login = async (credentials) => {
  try {
    const response = await apiConfig.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};

// Регистрация пользователя
export const register = async (userData) => {
  try {
    const response = await apiConfig.post('/auth/register', userData);
    return response.data;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};

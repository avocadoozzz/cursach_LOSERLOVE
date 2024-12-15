import apiConfig from './apiConfig';

// Получение услуг мастера по его ID
export const getMasterServices = async (masterId) => {
  try {
    const response = await apiConfig.get(`/masters/${masterId}/services`);
    return response.data;
  } catch (error) {
    console.error('Error fetching master services:', error);
    throw error;
  }
};

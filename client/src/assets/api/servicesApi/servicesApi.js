import apiConfig from './apiConfig';

// Получение всех услуг
export const getServices = async () => {
  try {
    const response = await apiConfig.get('/services');
    return response.data;
  } catch (error) {
    console.error('Error fetching services:', error);
    throw error;
  }
};

// Получение услуг определённого мастера
export const getServicesByMaster = async (masterId) => {
  try {
    const response = await apiConfig.get(`/services/master/${masterId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching services by master:', error);
    throw error;
  }
};

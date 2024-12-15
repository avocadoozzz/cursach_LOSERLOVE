import apiConfig from './apiConfig';

// Создание новой записи
export const createBooking = async (bookingData) => {
  try {
    const response = await apiConfig.post('/bookings', bookingData);
    return response.data;
  } catch (error) {
    console.error('Error creating booking:', error);
    throw error;
  }
};

// Получение записи по ID
export const getBookingById = async (bookingId) => {
  try {
    const response = await apiConfig.get(`/bookings/${bookingId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching booking by ID:', error);
    throw error;
  }
};

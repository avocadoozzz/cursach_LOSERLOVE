import apiConfig from "../apiConfig";

// Получение доступных дат для записи
export const getAvailableDates = async () => {
  try {
    const response = await apiConfig.get('/datepicker/available-dates');
    return response.data;
  } catch (error) {
    console.error('Error fetching available dates:', error);
    throw error;
  }
};

// Сохранение выбранной даты
export const saveSelectedDate = async (selectedDate) => {
  try {
    const response = await apiConfig.post('/datePicker/save', { date: selectedDate });
    return response.data;
  } catch (error) {
    console.error('Error saving selected date:', error);
    throw error;
  }
};

// Получение данных по выбранной дате (например, для отображения записи)
export const getDateDetails = async (date) => {
  try {
    const response = await apiConfig.get(`/datePicker/details/${date}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching date details:', error);
    throw error;
  }
};

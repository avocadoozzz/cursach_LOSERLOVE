import { useState } from "react";
import { Calendar } from "react-calendar";// Импортируем календарь
import "react-calendar/dist/Calendar.css"; // Подключаем стилиimport "./datepicker.css";
import "./datepicker.css";

const DatePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Доступные времена для разных дат
  const availableTimes = {
    "02.03.2025": ["10:30", "12:10", "14:50", "17:05", "21:20"],
    "24.02.2025": ["09:30", "10:25", "13:10", "15:55", "18:15"],
  };
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // Функция выбора даты
  const handleDateSelect = (date) => {
    const formattedDate = date.toLocaleDateString("ru-RU");
    setSelectedDate(date);
    const slots = availableTimes[formattedDate] || [];
    setAvailableSlots(slots);
    setFilteredSlots(slots); // Изначально показываем все доступные слоты
    setIsCalendarOpen(false);
    setSelectedFilter(null); // Сбрасываем фильтр при выборе новой даты
  };
// Функция фильтрации времени
const filterSlots = (filter) => {
  if (!availableSlots.length) return;

  let filtered = [];
  switch (filter) {
    case "Утро":
      filtered = availableSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 6 && hour < 12;
      });
      break;
    case "День":
      filtered = availableSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 12 && hour < 18;
      });
      break;
    case "Вечер":
      filtered = availableSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 18 && hour < 24;
      });
      break;
    case "Ночь":
      filtered = availableSlots.filter((time) => {
        const hour = parseInt(time.split(":")[0]);
        return hour >= 0 && hour < 6;
      });
      break;
    default:
      filtered = availableSlots;
  }
  setFilteredSlots(filtered);
  setSelectedFilter(filter);
};

  return (
    <div className="one1">
      {/* Кнопки переключения месяца */}
      <div className="flex4">
      <button
          className={`filter-button button-morning ${selectedFilter === "Утро" ? "bg-gray-200" : ""}`}
          onClick={() => filterSlots("Утро")}
        >
          Утро
        </button>
        <button
          className={`filter-button button-day  ${selectedFilter === "День" ? "bg-gray-200" : ""}`}
          onClick={() => filterSlots("День")}
        >
          День
        </button>
        <button
          className={`filter-button button-evening  ${selectedFilter === "Вечер" ? "bg-gray-200" : ""}`}
          onClick={() => filterSlots("Вечер")}
        >
          Вечер
        </button>
        <button
          className={`filter-button button-night   ${selectedFilter === "Ночь" ? "bg-gray-200" : ""}`}
          onClick={() => filterSlots("Ночь")}
        >
          Ночь
        </button>
      </div>

 {/* Кнопка с иконкой календаря */}
 <button onClick={toggleCalendar} className="icon" >
        📅
      </button>

      {/* Выпадающий календарь */}
      {isCalendarOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
          <Calendar
            onChange={handleDateSelect}
            value={selectedDate}
          />
        </div>
      )}

      {/* Выбранная дата */}
      <p className="text-gray-700 font-bold mt-2">
  Выбрано: {selectedDate ? selectedDate.toLocaleDateString() : "Дата не выбрана"}
</p>
 {/* Доступные временные слоты */}
{filteredSlots.length > 0 ? (
  <div className="mt-2">
    <p className="text-gray-600">Доступное время:</p>
    <div className="flex gap-2 mt-1 flex-wrap">
      {filteredSlots.map((time, index) => (
        <button
          key={index}
          className={`bg-gray-100 px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-300 ${
            selectedTime === time ? "bg-gray-300" : ""
          }`}
          onClick={() => setSelectedTime(time)} // Обновляем выбранное время
        >
          {time}
        </button>
      ))}
    </div>
  </div>
) : (
  <p className="text-gray-500 mt-2">Нет доступного времени</p>
)}


      {/* Карточка с данными */}
      <div className="bg-white p-4 rounded-lg shadow mt-4 w-80">
        <p className="text-gray-700 font-bold">Есения</p>
        <p className="text-gray-500">45.00 BYN • 25 мин</p>
        <div className="mt-2 flex items-center">
    {selectedTime ? (
      <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
        {selectedTime}
      </span>
    ) : (
            <span className="text-gray-500">Нет доступного времени</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

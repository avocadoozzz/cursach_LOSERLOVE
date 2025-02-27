import { useState } from "react";
import { Calendar } from "react-calendar";// Импортируем календарь
import "react-calendar/dist/Calendar.css"; // Подключаем стилиimport "./datepicker.css";
import "./datepicker.css";
import staffImage from "../../assets/img/header/staff.png";
import { useNavigate } from "react-router-dom";

const DatePicker = () => {
  const navigate = useNavigate(); // Хук для перехода на главную страницу
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [filteredSlots, setFilteredSlots] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); // Состояние для модального окна
      const [openAccountModal, setOpenAccountModal] = useState(false);

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

const handleTimeSelect = (time) => {
  setSelectedTime(time);
};
const handleToggleAccountModal = () => {
  setOpenAccountModal((prev) => !prev);
};
const closeModal = () => {
  setIsModalOpen(false);
  navigate("/");
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

      {/* Выпадающий календарь*/ }
      {isCalendarOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4 z-10">
          <Calendar
            onChange={handleDateSelect}
            value={selectedDate}
          />
        </div>
      )}

      {/* Выбранная дата*/ }
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
    onClick={() => handleTimeSelect(time)} // Вызываем правильную функцию
  >
    {time}
  </button>
))}

    </div>
  </div>
) : (
  <p className="text-gray-500 mt-2">Нет доступного времени</p>
)}

      {/* Карточка с данными*/ }
      <div className="dannue">
        <img src={staffImage} className="account-icon12" />
        <p className="text1">Есения</p>
        <p className="text2">45.00 BYN • 25 мин</p>
        <div className="mt-2">
  {selectedTime ? (
    <button className="bg" onClick={() => setIsModalOpen(true)} >
      {selectedTime}
    </button>
  ) : (
    <span className="text-gray-500">Нет доступного времени</span>
  )}
</div>
        {isModalOpen && (
        <div className="modal11">
          <div className="modal-content11">
          <button className="close-button11" onClick={() => setIsModalOpen(false)}>
            &times;
          </button>
            <h2>Подтверждение записи</h2>
            <p>Вы выбрали дату: {selectedDate?.toLocaleDateString("ru-RU")}</p>
            <p>Мастер: Есения</p>
            <p>Время: {selectedTime}</p>
            <button onClick={closeModal}>ОК</button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default DatePicker;

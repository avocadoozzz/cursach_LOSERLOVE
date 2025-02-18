import { useState } from "react";
import { Calendar } from "lucide-react";


const DatePicker = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setIsCalendarOpen(false);
  };

  return (
    <div className="flex flex-col items-center p-4">
      {/* Кнопки переключения месяца */}
      <div className="flex gap-2 mb-4">
        <button className="bg-white px-4 py-2 rounded-full shadow">Март</button>
        <button className="bg-white px-4 py-2 rounded-full shadow">Апрель</button>
        <button className="bg-white px-4 py-2 rounded-full shadow">Утро</button>
        <button className="bg-white px-4 py-2 rounded-full shadow">День</button>
        <button className="bg-white px-4 py-2 rounded-full shadow">Вечер</button>
        <button className="bg-white px-4 py-2 rounded-full shadow">Ночь</button>
        <button className="bg-white px-4 py-2 rounded-full shadow">Выходные</button>
      </div>

      {/* Кнопка с иконкой календаря */}
      <button
        onClick={toggleCalendar}
        className="bg-white p-3 rounded-lg shadow flex items-center justify-center"
      >
     <Calendar className="w-6 h-6 text-gray-600" />

      </button>

      {/* Выпадающий календарь */}
      {isCalendarOpen && (
        <div className="absolute mt-2 bg-white shadow-lg rounded-lg p-4">
          <p className="text-gray-600 mb-2">Выберите дату:</p>
          <div className="grid grid-cols-7 gap-2">
            {[...Array(31)].map((_, i) => (
              <button
                key={i}
                onClick={() => handleDateSelect(i + 1)}
                className={`px-3 py-2 rounded-lg ${
                  selectedDate === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-100 text-gray-800"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Карточка с данными */}
      <div className="bg-white p-4 rounded-lg shadow mt-4 w-80">
        <p className="text-gray-700 font-bold">Виктория</p>
        <p className="text-gray-500">45.00 BYN • 25 мин</p>
        <div className="mt-2 flex items-center">
          <span className="bg-gray-100 px-3 py-1 rounded-lg text-gray-700">
            10:30
          </span>
        </div>
      </div>
    </div>
  );
};

export default DatePicker;

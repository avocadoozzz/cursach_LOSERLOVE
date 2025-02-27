import React, { useState } from "react";
import staffImage from "../../assets/img/header/staff.png";
import { useNavigate } from "react-router-dom";
import "./profilePage.css";

const ProfilePage = () => {
  const navigate = useNavigate(); // Хук для навигации
  const [selectedTab, setSelectedTab] = useState("profile"); // Состояние для активной вкладки
  const [email, setEmail] = useState("nastya.buchmeleva2004@gmail.com");
  const [name, setName] = useState("Анастасия");

  // Данные истории записей и предстоящих визитов
  const appointments = [
    { date: "02.03.2025", time: "10:30", status: "Подтверждено" },
    { date: "24.02.2025", time: "13:10", status: "Ожидает подтверждения" },
  ];

  const upcomingAppointments = appointments.filter(
    (appointment) => appointment.status === "Подтверждено"
  );

  // Функции для изменения активной вкладки
  const handleTabChange = (tab) => {
    setSelectedTab(tab);
  };

  // Функция для обновления данных пользователя
  const handleEditProfile = () => {
    // Реализуйте логику для обновления профиля пользователя (например, через API или сохранение в локальном хранилище)
    alert("Профиль обновлен");
  };

  return (
    <div className="profile-container">
<button className="close-button111" onClick={() =>  navigate("/")}>
            &times;
          </button>
      <h2>Личный кабинет</h2>

      {/* Навигация между вкладками */}
      <div className="tabs">
        <button
          className={selectedTab === "profile" ? "active" : ""}
          onClick={() => handleTabChange("profile")}
        >
          Мой профиль
        </button>
        <button
          className={selectedTab === "history" ? "active" : ""}
          onClick={() => handleTabChange("history")}
        >
          История записей
        </button>
        <button
          className={selectedTab === "upcoming" ? "active" : ""}
          onClick={() => handleTabChange("upcoming")}
        >
          Предстоящие визиты
        </button>
      </div>

      {/* Контент, в зависимости от выбранной вкладки */}
      {selectedTab === "profile" && (
        <div className="profile-content">
          <h3>Данные пользователя:</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button onClick={handleEditProfile}>Сохранить изменения</button>
        </div>
      )}

      {selectedTab === "history" && (
        <div className="history-content">
          <h3>История визитов:</h3>
          <ul>
            {appointments.map((appointment, index) => (
              <li key={index}>
                <p>
                  {appointment.date} - {appointment.time} - Статус:{" "}
                  {appointment.status}
                </p>
              </li>
            ))}
          </ul>
        </div>
      )}

      {selectedTab === "upcoming" && (
        <div className="upcoming-content">
          <h3>Предстоящие визиты:</h3>
          <ul>
            {upcomingAppointments.length > 0 ? (
              upcomingAppointments.map((appointment, index) => (
                <li key={index}>
                  <p>{appointment.date} - {appointment.time}</p>
                </li>
              ))
            ) : (
              <p>Нет предстоящих визитов.</p>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;

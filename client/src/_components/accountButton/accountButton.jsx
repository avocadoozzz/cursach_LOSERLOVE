import React from "react";
import { useNavigate } from "react-router-dom"; 
import staffImage from "../../assets/img/header/staff.png";

const AccountButton = () => {
  const navigate = useNavigate();

  // Проверяем, авторизован ли пользователь
  const user = localStorage.getItem('token');  // Проверяем наличие токена

  // Функция для обработки перехода
  const handleNavigation = () => {
    if (user) {
      navigate("/profilePage"); // Если пользователь авторизован, перенаправляем на страницу профиля
    } else {
      navigate("/register"); // Если пользователь не авторизован, перенаправляем на страницу регистрации
    }
  };

  return (
    <div className="div">
    <button className="div7"
      onClick={handleNavigation}

    >
      <img className="img"
        src={staffImage}  
        alt="Account"
        width="30"
       height="30"
        background="none"

      />
    </button>
    </div>
  );
};

export default AccountButton;

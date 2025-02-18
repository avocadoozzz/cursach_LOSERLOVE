import React, { useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./masterServices.css";
import langIcon from '../../assets/img/header/lang.png';
import razlogIcon from '../../assets/img/header/razlog.png';
import accountIcon from '../../assets/img/header/account.png';
import avatarIcon from '../../assets/img/avatar.png';

const allServices = [
  { name: "Арелолы", price: 10, duration: 5, category: "Зоны отдельно" },
  { name: "Бакенбарды", price: 10, duration: 5, category: "Зоны отдельно" },
  { name: "Бедро/голень", price: 30, duration: 20, category: "Зоны отдельно" },
  { name: "Глубокое бикини", price: 30, duration: 20, category: "Зоны отдельно" },
  { name: "Глубокое бикини (мужское)", price: 45, duration: 25, category: "Зоны отдельно" },
  { name: "Грудь", price: 20, duration: 15, category: "Зоны отдельно" },
  { name: "Живот полностью", price: 30, duration: 10, category: "Зоны отдельно" },
  { name: "Грудь и живот", price: 50, duration: 30, category: "Комплекс" },
  { name: "Задняя/внутренняя поверхность бедра", price: 20, duration: 20, category: "Зоны отдельно" },
  { name: "Затылок(кантик)", price: 10, duration: 5, category: "Зоны отдельно" },
  { name: "Ягодицы", price: 20, duration: 10, category: "Зоны отдельно" },
  { name: "Все тело", price: 160, duration: 120, category: "Комплекс" },
  { name: "К 1 (подмышки + глубокое бикини)", price: 40, duration: 25, category: "Комплекс" },
  { name: "К 1 для мужчин ( подмышки-глубокое бикини)", price: 55, duration: 35, category: "Комплекс" },
  { name: "К 12 (подмышки + глубокое бикини + руки полностью + ноги полностью)", price: 120, duration: 80, category: "Комплекс" },
  { name: "К 2 (глубокое бикини + ноги полностью)", price: 80, duration: 45, category: "Комплекс" },
  { name: "К 7 (подмышки+ глубокое бикини+ полоска живота)", price: 45, duration: 30, category: "Комплекс" },
];

const MasterServices = () => {
  const [selectedServices, setSelectedServices] = useState({}); // Состояние для отслеживания выбранных услуг
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState(["Зоны отдельно", "Комплекс"]);
  const navigate = useNavigate();

  const mastersList = [{ id: 1, name: "Есения" }];

  const handleToggleAccountModal = () => {
    setOpenAccountModal((prev) => !prev);
  };

  const handleClick = (serviceName) => {
    setSelectedServices((prev) => ({
      ...prev,
      [serviceName]: !prev[serviceName], // Переключаем состояние выбранной услуги
    }));
  };

  const finalServices = allServices.filter((service) => category.includes(service.category));

  return (
    <div className="header">
      <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <span style={{ fontSize: "24px" }}>{"<"}</span>
      </IconButton>
      <h1 className="masters-title3">Мастер</h1>
      <IconButton onClick={() => navigate(`/date-picker`)} sx={{ position: "absolute", top: 10, right: 10, color: "white", zIndex: 9999 }}>
  <span style={{ fontSize: "24px" }}>{">"}</span>
</IconButton>
      <div className="burger-menu2">
        <IconButton onClick={() => setMenuOpen((prev) => !prev)} sx={{ color: "white" }}>
          <span className={`burger-icon3 ${menuOpen ? "close-icon2" : ""}`}>
            {menuOpen ? "✖" : "☰"}
          </span>
        </IconButton>
      </div>

      {menuOpen && (
        <div className="nr-lang-menu3">
          <IconButton sx={{ color: "white" }}>
            <img src={langIcon} alt="Language" width="50" height="50" />
          </IconButton>
          <IconButton sx={{ color: "white" }}>
            <img src={razlogIcon} alt="Razlog" width="20" height="20" />
          </IconButton>
          <IconButton onClick={handleToggleAccountModal} sx={{ color: "white" }}>
            <img src={accountIcon} alt="Account" width="60" height="60" />
          </IconButton>
          <div className="menu-button1234">
            <button className="menu-button1111" onClick={() => navigate("/services")}>Услуги</button>
            <button className="menu-button2222" onClick={() => navigate("/masters")}>Мастер</button>
            <button className="menu-button3333" onClick={() => navigate("/reviews")}>Отзывы</button>
          </div>
        </div>
      )}

      {openAccountModal && (
        <div className="account-modal">
          <button className="close-button1" onClick={handleToggleAccountModal}>&times;</button>
          <h3>Выберите действие:</h3>
          <button onClick={() => navigate("../register")} className="account-modal1">Зарегистрироваться</button>
          <button onClick={() => navigate("../auth")} className="account-modal2">Войти</button>
        </div>
      )}

      <div className="search-section">
        <div className="masters-list">
          {mastersList.map((master) => (
            <div key={master.id} className="master-card1">
              <p className="master-name12">{master.name}</p>
              <p className="master-name11">Мастер</p>
            </div>
          ))}
        </div>
      </div>

      <div className="list">
        <h2 className="section-title1">Услуги</h2>
        <div className="service-list1">
          {finalServices.map((service, index) => (
            <div key={index} className="service-card1">
              <img src={avatarIcon} alt="Avatar" width="50" height="50" />
              <div className="service-name1">{service.name}</div>
              <div className="service-category1">{service.category}</div>
              <div className="service-details1">{service.price} BYN • {service.duration} м</div>
              <Button
                variant="contained"
                className="select-button11"
                onClick={() => handleClick(service.name)}
              >
                {selectedServices[service.name] ? 'Удалить' : 'Выбрать'}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MasterServices;

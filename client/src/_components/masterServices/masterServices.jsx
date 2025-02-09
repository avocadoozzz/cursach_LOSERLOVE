import React, { useState } from "react";
import { Button, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./masterServices.css";
import langIcon from '../../assets/img/header/lang.png';
import razlogIcon from '../../assets/img/header/razlog.png';
import accountIcon from '../../assets/img/header/account.png';

const allServices = [
  { name: "Арелолы", price: 10, duration: 5, category: "zones" },
  { name: "Бакенбарды", price: 10, duration: 5, category: "zones" },
  { name: "Бедро/голень", price: 30, duration: 20, category: "zones" },
  { name: "Глубокое бикини", price: 30, duration: 20, category: "zones" },
  { name: "Глубокое бикини (мужское)", price: 45, duration: 25, category: "zones" },
  { name: "Грудь", price: 20, duration: 15, category: "zones" },
  { name: "Живот полностью", price: 30, duration: 10, category: "zones" },
  { name: "Грудь и живот", price: 50, duration: 30, category: "complexes" },
  { name: "Задняя/внутренняя поверхность бедра", price: 20, duration: 20, category: "zones" },
  { name: "Затылок(кантик)", price: 10, duration: 5, category: "zones" },
  { name: "Ягодицы", price: 20, duration: 10, category: "zones" },
  { name: "Все тело", price: 160, duration: 120, category: "complexes" },
  { name: "К 1 (подмышки + глубокое бикини)", price: 40, duration: 25, category: "complexes" },
  { name: "К 1 для мужчин ( подмышки-глубокое бикини)", price: 55, duration: 35, category: "complexes" },
  { name: "К 12 (подмышки + глубокое бикини + руки полностью + ноги полностью)", price: 120, duration: 80, category: "complexes" },
  { name: "К 2 (глубокое бикини + ноги полностью)", price: 80, duration: 45, category: "complexes" },
  { name: "К 7 (подмышки+ глубокое бикини+ полоска живота)", price: 45, duration: 30, category: "complexes" },
];

const MasterServices = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [category, setCategory] = useState("zones");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const [selectedMasters, setSelectedMasters] = useState([]);
  const navigate = useNavigate();

  const mastersList = [{ id: 1, name: "Есения" }];

  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleToggleAccountModal = () => {
    setOpenAccountModal((prev) => !prev);
  };

  const handleAccountAction = (action) => {
    if (action === "register") {
      navigate("../register");
    } else if (action === "auth") {
      navigate("../auth");
    }
    setOpenAccountModal(false);
  };

  const toggleSelect = (id) => {
    setSelectedMasters((prev) =>
      prev.includes(id) ? prev.filter((masterId) => masterId !== id) : [...prev, id]
    );
  };

  const finalServices = allServices.filter((service) => service.category === category);

  return (
    <div className="header">
      <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <span style={{ fontSize: "24px" }}>{"<"}</span>
      </IconButton>
      <h1 className="masters-title2">Мастер</h1>

      <div className="burger-menu2">
        <IconButton onClick={() => setMenuOpen((prev) => !prev)} sx={{ color: "white" }}>
          <span className={`burger-icon2 ${menuOpen ? "close-icon2" : ""}`}>
            {menuOpen ? "✖" : "☰"}
          </span>
        </IconButton>
      </div>

      {menuOpen && (
        <div className="nr-lang-menu2">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={langIcon} alt="Language" width="30" height="30" />
          </IconButton>

          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={razlogIcon} alt="Razlog" width="20" height="20" />
          </IconButton>

          <IconButton onClick={handleToggleAccountModal} sx={{ color: "white" }}>
            <img src={accountIcon} alt="Account" width="40" height="40" />
          </IconButton>

          <div className="menu-button123">
            <button className="menu-button111" onClick={() => navigate("/services")}>Услуги</button>
            <button className="menu-button222" onClick={() => navigate("/masters")}>Мастер</button>
            <button className="menu-button333" onClick={() => navigate("/reviews")}>Отзывы</button>
          </div>
        </div>
      )}

      {openAccountModal && (
        <div className="account-modal">
          <button className="close-button1" onClick={handleToggleAccountModal}>
            &times;
          </button>
          <h3>Выберите действие:</h3>
          <button onClick={() => handleAccountAction("register")} className="account-modal1">Зарегистрироваться</button>
          <button onClick={() => handleAccountAction("auth")} className="account-modal2">Войти</button>
        </div>
      )}

      <div className="search-section">
        <div className="masters-list">
          {mastersList
            .filter((master) => master.name.toLowerCase().includes(searchTerm.toLowerCase()))
            .map((master) => (
              <div key={master.id} className="master-card">
                <p className="master-name">{master.name}</p>
                <p className="master-name1">Мастер</p>
              </div>
            ))}
        </div>
      </div>
      <div className="list">
      <h2 className="section-title">{category === "zones" ? "Зоны отдельно" : "Комплексы"}</h2>

      <div className="service-list">
        {finalServices.length > 0 ? (
          finalServices.map((service, index) => (
            <div key={index} className="service-card">
              <div className="service-name">{service.name}</div>
              <div className="service-details">{service.price} BYN • {service.duration} м</div>
            </div>
          ))
        ) : (
          <p>Нет доступных услуг</p>
        )}
      </div>
    </div>
    </div>
  );
};

export default MasterServices;

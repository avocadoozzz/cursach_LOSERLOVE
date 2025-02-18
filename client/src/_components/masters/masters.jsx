import React, { useState } from "react";
import "./masters.css";
import staffImage from "../../assets/img/header/staff.png";
import searchImage from "../../assets/img/search.png";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import langIcon from '../../assets/img/header/lang.png';
import razlogIcon from '../../assets/img/header/razlog.png';
import accountIcon from '../../assets/img/header/account.png';

const Masters = () => {
      const [openModal, setOpenModal] = useState(false);
      const [openAccountModal, setOpenAccountModal] = useState(false);
      const [menuOpen, setMenuOpen] = useState(false); // Состояние для бургер-меню
      const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [selectedMasters, setSelectedMasters] = useState([]);

  const mastersList = [{ id: 1, name: "Есения" }];

  const toggleSelect = (id) => {
    setSelectedMasters((prev) =>
      prev.includes(id) ? prev.filter((masterId) => masterId !== id) : [...prev, id]
    );
  };
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

  return (
    <div className="nr-header nrs-gradient">

<IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
    <span style={{ fontSize: "28px" }}>{"<"}</span>
  </IconButton>

      <h1 className="masters-title">Выбор мастера</h1>

      <IconButton onClick={() => navigate(`/masterServices/${selectedMasters[0] || 1}`)} sx={{ position: "absolute", top: 10, right: 10, color: "white", zIndex: 9999 }}>
  <span style={{ fontSize: "28px" }}>{">"}</span>
</IconButton>


      {/* Бургер-меню (кнопка) */}
      <div className="burger-menu1">
          <IconButton onClick={() => setMenuOpen((prev) => !prev)} sx={{ color: "white" }}>
            <span className={`burger-icon1 ${menuOpen ? "close-icon1" : ""}`}>
            {menuOpen ? "✖" : "☰"}</span>
          </IconButton>
        </div>
        {/* Мобильное меню (отображается только если menuOpen === true) */}
      {menuOpen && (
        <div className="nr-lang-menu1">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={langIcon} alt="Language" width="30" height="30" />
          </IconButton>

          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={razlogIcon} alt="Razlog" width="20" height="20" />
          </IconButton>

          <IconButton onClick={handleToggleAccountModal} sx={{ color: "white" }}>
            <img src={accountIcon} alt="Account" width="40" height="40" />
          </IconButton>

          {/* Новые кнопки */}
          <div className="menu-button12">
          <button className="menu-button11" onClick={() => navigate("/services")}>Услуги</button>
          <button className="menu-button22" onClick={() => navigate("/masters")}>Мастер</button>
          <button className="menu-button33" onClick={() => navigate("/reviews")}>Отзывы</button>
          </div>
        </div>
         )}
         {/* Модальное окно для аккаунта */}
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
      <div className="masters-container">
        <div className="search-container">
          <img src={searchImage} alt="Поиск" className="search-icon" />
          <span className="search-text">Поиск</span>
          <input
            type="text"
            placeholder=""
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="masters-search"
          />
        </div>
        <p className="masters-selected">Выбрано: {selectedMasters.length}</p>

        <div className="masters-list">
        <img src={staffImage} className="account-icon" />
          {mastersList
            .filter((master) => master.name.toLowerCase().includes(search.toLowerCase()))
            .map((master) => (
              <div key={master.id} className="master-card4">
                <p className="master-name">{master.name}</p>
                <p className="master-name1">Мастер</p>
                <button
                  className={`select-button ${selectedMasters.includes(master.id) ? "selected" : ""}`}
                  onClick={() => toggleSelect(master.id)}
                >
                  {selectedMasters.includes(master.id) ? "✔" : "○"}
                </button>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Masters;

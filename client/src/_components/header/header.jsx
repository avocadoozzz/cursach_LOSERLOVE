import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import langIcon from '../../assets/img/header/lang.png';
import razlogIcon from '../../assets/img/header/razlog.png';
import accountIcon from '../../assets/img/header/account.png';
import "./header.css";
import staffImage from "../../assets/img/header/staff.png";

const Header = ({ user }) => {
  const [openModal, setOpenModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для бургер-меню
  const navigate = useNavigate();

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
      <div className="nr-block">
        <div className="nr-title-block">
          <div className="nr-title">LASER LOVE</div>
          <div className="nr-subtitle">Могилёв, ул. Турова , д.16</div>
        </div>

        {/* Бургер-меню (кнопка) */}
        <div className="burger-menu">
          <IconButton onClick={() => setMenuOpen((prev) => !prev)} sx={{ color: "white" }}>
            <span className={`burger-icon ${menuOpen ? "close-icon" : ""}`}>
            {menuOpen ? "✖" : "☰"}</span>
          </IconButton>
        </div>

        {/* Блок с иконками (скрывается на мобилках) */}
        <div className="nr-lang">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={langIcon} alt="Language" width="30" height="30" />
          </IconButton>

          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={razlogIcon} alt="Razlog" width="20" height="20" />
          </IconButton>

          <IconButton onClick={handleToggleAccountModal} sx={{ color: "white" }}>
            <img src={accountIcon} alt="Account" width="40" height="40" />
          </IconButton>

          <button 
  onClick={user ? () => navigate("/profilePage") : null} 
  disabled={!user} 
  style={{ background: "transparent", border: "none", cursor: user ? "pointer" : "default" }}
> 
  <img 
    src={staffImage} 
    alt="Account" 
    width="40" 
    height="40" 
    style={{ filter: user ? "hue-rotate(300deg)" : "hue-rotate(0deg)" }} 
  />
</button>

        </div>
      </div>

      {/* Мобильное меню (отображается только если menuOpen === true) */}
      {menuOpen && (
        <div className="nr-lang-menu">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={langIcon} alt="Language" width="30" height="30" />
          </IconButton>

          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={razlogIcon} alt="Razlog" width="20" height="20" />
          </IconButton>

          <IconButton onClick={handleToggleAccountModal} sx={{ color: "white" }}>
            <img src={accountIcon} alt="Account" width="40" height="40" />
          </IconButton>

          <button onClick={() => navigate("/register")}>
        {user ? "Личный кабинет" : "Регистрация"}
      </button>

          {/* Новые кнопки */}
          <div className="menu-button">
          <button className="menu-button1" onClick={() => navigate("/services")}>Услуги</button>
          <button className="menu-button2" onClick={() => navigate("/masters")}>Мастер</button>
          <button className="menu-button3" onClick={() => navigate("/reviews")}>Отзывы</button>
          </div>
        </div>
      )}

      {/* Модальное окно для аккаунта */}
      {openAccountModal && (
        <div className="account-modal">
          <button className="close-button" onClick={handleToggleAccountModal}>
            &times;
          </button>
          <h3>Выберите действие:</h3>
          <button onClick={() => handleAccountAction("register")} className="account-modal1">Зарегистрироваться</button>
          <button onClick={() => handleAccountAction("auth")} className="account-modal2">Войти</button>
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useState  } from "react";
import { Button, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./headerdatepicker.css";
import langIcon from '../../assets/img/header/lang.png';
import razlogIcon from '../../assets/img/header/razlog.png';
import accountIcon from '../../assets/img/header/account.png';


const Headerdatepicker = () => {
  const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [openAccountModal, setOpenAccountModal] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false); // Состояние для бургер-меню
   

  const dates = [
    "16 ЧТ", "20 ПН", "22 СР", "24 ПТ", "26 ВС", "28 ВТ", "30 ЧТ"
  ];
  const handleToggleAccountModal = () => {
    setOpenAccountModal((prev) => !prev);
  };
  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
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
    <div className="one2">
      {/* Header */}
      <div className="header1 ">
      <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <span style={{ fontSize: "24px" }}>{"<"}</span>
      </IconButton>
      <h1 className="masters-title22">Дата и время</h1>

      
       {/* Бургер-меню (кнопка) */}
            <div className="burger-menu2">
                <IconButton onClick={() => setMenuOpen((prev) => !prev)} sx={{ color: "white" }}>
                  <span className={`burger-icon2 ${menuOpen ? "close-icon2" : ""}`}>
                  {menuOpen ? "✖" : "☰"}</span>
                </IconButton>
              </div>
              {/* Мобильное меню (отображается только если menuOpen === true) */}
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
      
                {/* Новые кнопки */}
                <div className="menu-button123">
                <button className="menu-button111" onClick={() => navigate("/services")}>Услуги</button>
                <button className="menu-button222" onClick={() => navigate("/masters")}>Мастер</button>
                <button className="menu-button333" onClick={() => navigate("/reviews")}>Отзывы</button>
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
                  </div>
    </div>
  );
};

export default Headerdatepicker;

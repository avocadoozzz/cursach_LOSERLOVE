import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import langIcon from '../../assets/img/header/lang.png';
import razlogIcon from '../../assets/img/header/razlog.png';
import accountIcon from '../../assets/img/header/account.png';
//import auth from '../auth/auth.jsx';
import "./header.css";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false); // Для модального окна аккаунта
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const userid = localStorage.getItem("id");

  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleToggleAccountModal = () => {
    setOpenAccountModal((prev) => !prev);
  };

  const handleAccountAction = (action) => {
    // Навигация для регистрации или входа
    if (action === "register") {
      navigate("/register");
    } else if (action === "auth") {
      navigate("../auth");
    }
    setOpenAccountModal(false); // Закрыть модальное окно после выбора действия
  };

  return (
    <div className="nr-header nrs-gradient">
      <div className="nr-block">
        <div className="nr-title-block">
          <div className="nr-title">LASER LOVE</div>
          <div className="nr-subtitle">Могилёв, ул. Турова , д.16</div>
        </div>

        <div className="nr-lang">
          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={langIcon} alt="Language" width="30" height="30" />
          </IconButton>

          <IconButton onClick={handleToggleModal} sx={{ color: "white" }}>
            <img src={razlogIcon} alt="Razlog" width="20" height="20" />
          </IconButton>

          <IconButton
            onClick={handleToggleAccountModal}
            sx={{ color: "white" }}
          >
            <img src={accountIcon} alt="Account" width="40" height="40" />
          </IconButton>
        </div>
      </div>

      {/* Модальное окно для аккаунта */}
      {openAccountModal && (
        <div className="account-modal">
        <button className="close-button" onClick={handleToggleAccountModal}>
            &times;
          </button>
          <h3>Выберите действие :</h3>
          <button onClick={() => handleAccountAction("register")} className="account-modal1">Зарегистрироваться</button>
          <button onClick={() => handleAccountAction("auth")} className="account-modal2">Войти</button>
        </div>
      )}
    </div>
  );
};

export default Header;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MapIcon from "@mui/icons-material/Map";
import CompanyBg from "../assets/images/mobile/company_bg.svg"; // Пример импорта локального изображения

import MapModal from "../../_components/modal/mapModal/mapModal";
import EditClientModal from "../../_components/modal/clientModal/clientModal";
import "./header.css";

const Header = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openEditClientModal, setOpenEditClientModal] = useState(false);
  const navigate = useNavigate();

  const userRole = localStorage.getItem("role");
  const userid = localStorage.getItem("id");

  const handleToggleModal = () => {
    setOpenModal((prev) => !prev);
  };

  const handleToggleEditClientModal = () => {
    setOpenEditClientModal((prev) => !prev);
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
            <MapIcon />
          </IconButton>

          <IconButton
            onClick={() => {
              if (userRole === "client") {
                handleToggleEditClientModal();

              } else {
                navigate("/login");
              }
            }}
            sx={{ color: "white" }}
          >
            <PersonIcon />
          </IconButton>
        </div>

        <div className="btn-open-menu">
          <img src={CompanyBg} alt="Company Background" />
        </div>
      </div>

      {/* Модальные окна */}
      <MapModal open={openModal} onClose={handleToggleModal} />

      {userRole === "client" && (
        <EditClientModal
          clientId={userid}
          open={openEditClientModal}
          onClose={handleToggleEditClientModal}
        />
      )}

    </div>

  );
};

export default Header;

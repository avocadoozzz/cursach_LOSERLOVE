import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import '../../assets/img/Background.png';
import './InfoBlock.css';

const InfoBlock = () => {
  return (
    <><div className="main-image">
      <img src="../../assets/img/Background.png" alt="LOSERLOVEStudio" />
    </div><div className="info-block">
        <h2>LASER LOVE</h2>
        <p>📍 ул. Турова, д. 16</p>
        <p1>📞 +375 (44) *** ****</p1>
        <p2>🕒 Пн–Вс: с 09:00 до 21:00</p2>
        <p3>⭐ 5.0 (90 оценок)</p3>
        <button className="info-button">Записаться</button>
      </div></>
  );
};

export default InfoBlock;

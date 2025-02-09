import React, { useState } from "react";
import { Button, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./services.css";

const allServices = [
  { name: "Арелолы", price: 10, duration: 5, category: "zones" },
  { name: "Бакенбарды", price: 10, duration: 5, category: "zones" },
  { name: "Бедро/голень", price: 30, duration: 20, category: "zones" },
  { name: "Глубокое бикини", price: 30, duration: 20, category: "zones" },
  { name: "Глубокое бикини (мужское)", price: 45, duration: 25, category: "zones" },
  { name: "Грудь", price: 20, duration: 15, category: "zones" },
  { name: "Живот полностью", price: 30, duration: 10, category: "zones" },
  { name: "Грудь и живот", price: 50, duration: 30, category: "complexes" },
];

const Services = () => {
  const [category, setCategory] = useState("zones");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
  const navigate = useNavigate();

  // Фильтрация списка по категории и поисковому запросу
  const filteredServices = allServices.filter(service =>
    service.category === category &&
    service.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Применение сортировки
  const sortedServices = [...filteredServices].sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "duration") return a.duration - b.duration;
    return 0;
  });

  // Применение фильтра
  const finalServices = filterBy
    ? sortedServices.filter(service => service.name.toLowerCase().includes(filterBy.toLowerCase()))
    : sortedServices;

  return (
    <div className="header">
      <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <span style={{ fontSize: "24px" }}>{"<"}</span>
      </IconButton>
      <h1 className="masters-title1">Выбор услуг</h1>

      <div className="services-container">
        <div className="search-section">
          <TextField
            className="search-bar"
            placeholder="🔍 Поиск"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <FormControl className="filter-select">
            <InputLabel>Сортировка</InputLabel>
            <Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
              <MenuItem value="">Без сортировки</MenuItem>
              <MenuItem value="price">По цене</MenuItem>
              <MenuItem value="duration">По длительности</MenuItem>
            </Select>
          </FormControl>
          <FormControl className="filter-select">
            <InputLabel>Фильтр</InputLabel>
            <Select value={filterBy} onChange={(e) => setFilterBy(e.target.value)}>
              <MenuItem value="">Без фильтра</MenuItem>
              <MenuItem value="грудь">Грудь</MenuItem>
              <MenuItem value="бикини">Бикини</MenuItem>
            </Select>
          </FormControl>
        </div>

        <ToggleButtonGroup
          className="toggle-buttons"
          value={category}
          exclusive
          onChange={(_, newValue) => setCategory(newValue || category)}
        >
          <div className="zones">
          <ToggleButton value="zones">Зоны отдельно</ToggleButton>
          </div>
          <div className="complexes">
          <ToggleButton value="complexes">Комплексы</ToggleButton>
          </div>
        </ToggleButtonGroup>

        <h2 className="section-title">{category === "zones" ? "Зоны отдельно" : "Комплексы"}</h2>

        <div className="service-list">
          {finalServices.length > 0 ? (
            finalServices.map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-info">
                  <div className="service-name">{service.name}</div>
                  <div className="service-details">{service.price} BYN • {service.duration} м</div>
                </div>
                <Button variant="contained" className="select-button">Выбрать</Button>
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

export default Services;

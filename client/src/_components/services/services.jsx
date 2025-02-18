import React, { useState  } from "react";
import { Button, TextField, ToggleButton, ToggleButtonGroup, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconButton } from "@mui/material";
import "./services.css";
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
  { name: "К 12 (подмышки + глубокое бикини + руки полностью + ноги полностью) ", price: 120, duration: 80, category: "complexes" },
  { name: "К 2 (глубокое бикини + ноги полностью)", price: 80, duration: 45, category: "complexes" },
  { name: "К 7 (подмышки+ глубокое бикини+ полоска живота)", price: 45, duration: 30, category: "complexes" },
];

const Services = () => {
  const [openModal, setOpenModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false); // Состояние для бургер-меню
  const [category, setCategory] = useState("zones");
  //const [category, setCategory] = useState("zones");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [filterBy, setFilterBy] = useState("");
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
  const filteredServices = allServices.filter(service => {
    return service.category.includes(category) && 
           service.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  console.log(filteredServices)
  const sortedServices = [...filteredServices].sort((a, b) => {
      if (sortBy === "price") return a.price - b.price;
      if (sortBy === "duration") return a.duration - b.duration;
      return 0;
  });
  console.log(sortedServices)
  const finalServices = filterBy
      ? sortedServices.filter(service => service.name.toLowerCase().includes(filterBy.toLowerCase()))
      : sortedServices;
  console.log(finalServices)
   // const totalPrice = selectedServices.reduce((sum, s) => sum + s.price, 0);
   // const totalDuration = selectedServices.reduce((sum, s) => sum + s.duration, 0);

  return (
    <div className="header">
      <IconButton onClick={() => navigate(-1)} sx={{ position: "absolute", top: 10, left: 10, color: "white" }}>
        <span style={{ fontSize: "24px" }}>{"<"}</span>
      </IconButton>
      <h1 className="masters-title2">Выбор услуг</h1>
      <IconButton onClick={() => navigate(`/masters`)} sx={{ position: "absolute", top: 10, right: 10, color: "white", zIndex: 9999 }}>
  <span style={{ fontSize: "24px" }}>{">"}</span>
</IconButton>

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
        
        <div className="service-list">
          {finalServices.length > 0 ? (
            finalServices.map((service) => (
              <div key={`${service.name}-${service.category}`} className="service-card">
                <div className="service-info">
                  <div className="service-name">{service.name}</div>
                  <div className="service-details">{service.price} BYN • {service.duration} м</div>
                </div>
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

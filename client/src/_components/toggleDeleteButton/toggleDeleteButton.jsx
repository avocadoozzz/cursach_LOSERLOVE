import React, { useState,useEffect } from "react";
import { IconButton,ToggleButton, ToggleButtonGroup, Button, Dialog, DialogTitle, DialogContent, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useNavigate } from "react-router-dom";
import "./toggleDeleteButton.css";

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

const ToggleDeleteButton = () => {
      const [openModal, setOpenModal] = useState(false);
    const [selectedServices, setSelectedServices] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);
    const [category, setCategory] = useState("zones");
    //const [category, setCategory] = useState(["zones", "complexes"]);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("");
    const [filterBy, setFilterBy] = useState("");
    const navigate = useNavigate();

    // Очистка выбранных услуг при смене категории
    useEffect(() => {
        setSelectedServices([]);
    }, [category]);

    // Функция выбора/удаления услуги
    const toggleService = (service) => {
        setSelectedServices((prevSelected) => {
            const exists = prevSelected.some((s) => s.name === service.name && s.category === service.category);
            if (exists) {
                return prevSelected.filter((s) => !(s.name === service.name && s.category === service.category));
            } else {
                return [...prevSelected, service];
            }
        });
        setOpenDialog(true);
    };
    const handleToggleModal = () => {
        setOpenModal((prev) => !prev);
      };
    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleNavigate = () => {
        navigate("/date-picker");
    };
    console.log("Текущая категория:", category);

    // Фильтрация и сортировка услуг
    //const filteredServices = allServices.filter(service =>
     //   service.category === category && service.name.toLowerCase().includes(searchTerm.toLowerCase())
   // );
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
    // Уникальные выбранные услуги
    const selectedCategoryServices = selectedServices.filter(s => s.category === category);

    return (
        <div>
       <div className="toggle-buttons1">
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
        </div>
        <h2 className="section-title">{category === "zones" ? "Зоны отдельно" : "Комплексы"}</h2>

        <div className="service-list11">
            {finalServices.length > 0 ? (
                finalServices.map((service) => (
                    <div key={`${service.name}-${service.category}`} className="service-card10">
                        {selectedServices.some((s) => s.name === service.name && s.category === service.category) ? (
                            <IconButton className="delete-button" onClick={() => toggleService(service)}>
                                <DeleteIcon />
                            </IconButton>
                        ) : (
                            <Button variant="contained" className="select-button1" onClick={() => toggleService(service)}>
                                Выбрать
                            </Button>
                        )}
                    </div>
                ))
            ) : (
                <p>Нет доступных услуг</p>
            )}

            <Dialog open={openDialog} onClose={handleCloseDialog} className="Dialog" BackdropProps={{ style: { backgroundColor: "transparent" } }}>
                <DialogTitle>Выбранные процедуры</DialogTitle>
                <DialogContent>
                    <p>{selectedCategoryServices.length} услуг(и)</p>
                    <p>{selectedCategoryServices.reduce((sum, s) => sum + s.price, 0)} BYN • {selectedCategoryServices.reduce((sum, s) => sum + s.duration, 0)} м</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">Закрыть</Button>
                    <Button color="primary" variant="contained" onClick={handleNavigate}>Продолжить</Button>
                </DialogActions>
            </Dialog>
        </div>
        </div>
    );
};

export default ToggleDeleteButton;

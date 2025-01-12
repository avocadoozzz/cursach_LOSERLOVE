import React, { useState }  from 'react';
import './MapButton.css';

const MapButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="rect">
    <div className="rect1"> 
      <h1>Описание</h1>
      <p>
        Студия эпиляции.<br />
        Наши сотрудники с мед.образованием 👩<br />
        Находимся на ул. Турова д. 16.<br />
        Всегда приятные цены<br />
      </p>
      <p1>На карте</p1>
    <div className="map-button">
      <button onClick={openModal}>Открыть карту</button>
    </div>
    {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content1" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={closeModal}>
              ✖
            </button>
            <iframe
              title="Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d9392.943634133344!2d30.354591869024265!3d53.94531748862664!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x46d04e595c2774a1%3A0x794b225daea40a8e!2z0YPQuy4g0KLRg9GA0L7QstCwIDE2LCDQnNC-0LPQuNC70ZHQsiwg0JzQvtCz0LjQu9GR0LLRgdC60LDRjyDQvtCx0LvQsNGB0YLRjCAyMTIwMDgsINCR0LXQu9Cw0YDRg9GB0Yw!5e0!3m2!1sru!2sus!4v1736632533533!5m2!1sru!2sus"
              width="800"
              height="450"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </div>
      )}
    </div>
    </div>
  );
};

export default MapButton;

import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <header>
        <h1>LASER LOVE</h1>
        <p>Могилев, ул. Турова, д. 16</p>
      </header>
      <nav>
        <Link to="/services">Услуги</Link>
        <Link to="/login">Войти</Link>
      </nav>
      <main>
        <p>Добро пожаловать в студию эпиляции LASER LOVE!</p>
      </main>
    </div>
  );
};

export default Home;

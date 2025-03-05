import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authImage from "../../assets/img/auth.png";
import googleImage from "../../assets/img/google.png";
import appleImage from "../../assets/img/apple.png";
import "./auth.css";

const Login = () => {
  const [error, setError] = useState('');
  const navigate = useNavigate();
 // Состояние для формы
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleLogin = async (e) => {
    e.preventDefault();

     // Проверка заполнения полей
     if (!formData.email || !formData.password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setError('');

    try {
      // Отправка данных на сервер для авторизации
      const response = await fetch('http://localhost:5000/api/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при авторизации');
      }

      const result = await response.json();
      console.log('Ответ сервера:', result);

  // Сохранение данных пользователя в localStorage
  localStorage.setItem('user', JSON.stringify(result.user));

      // Сохранение данных пользователя в localStorage
      localStorage.setItem('client_id', result.client_id);
      localStorage.setItem('username', result.username);
      localStorage.setItem('role', result.role);
      localStorage.setItem('email', result.email);
      localStorage.setItem('password', result.password);

      // Перенаправление на страницу профиля
      navigate('/profilePage');
    } catch (error) {
      console.error('Ошибка при авторизации:', error);
      setError(error.message || 'Ошибка при авторизации. Попробуйте еще раз.');
    }
  };

  return (
    <div className="auth-container">
      <img src={authImage} alt="auth" />
      <div className="auth-container1">
        <h1 className="auth-title">Welcome back!</h1>
        <p className="auth-description">Enter your Credentials to access your account</p>
        <form className="auth-form" onSubmit={handleLogin}>
          <label className="auth-label" htmlFor="email">
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email" 
            //value={email}
            //onChange={(e) => setEmail(e.target.value)}
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            placeholder="Enter your email"
            required
          />
          <label className="auth-label" htmlFor="password">
            Password
          </label>
          <input
            id="password"
            type="password"
            name="password" 
            //value={password}
            //onChange={(e) => setPassword(e.target.value)}
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            placeholder="Enter your password"
            required
          />
          <div className="auth-remember">
            <input id="remember" type="checkbox" />
            <label htmlFor="remember">Remember for 30 days</label>
          </div>
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">
            Login
          </button>
        </form>
        <div className="auth-divider">
          <div className="auth-divider1"></div>
          <span>or</span>
        </div>
        <div className="auth-social">
          <button className="social-button google-button">
            <img src={googleImage} alt="Google" />
            Sign in with Google
          </button>
          <button className="social-button apple-button">
            <img src={appleImage} alt="Apple" />
            Sign in with Apple
          </button>
        </div>
        <p className="auth-footer">
          Don’t have an account? <a href="/register">Sign Up</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
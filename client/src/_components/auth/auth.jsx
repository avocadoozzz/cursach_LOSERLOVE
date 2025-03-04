import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import authImage from "../../assets/img/auth.png";
import googleImage from "../../assets/img/google.png";
import appleImage from "../../assets/img/apple.png";
import "./auth.css";
import { useDispatch } from 'react-redux';
import { loginUser } from '../../slices/userSlice'; 

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
const navigate = useNavigate();
const dispatch = useDispatch(); 

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    setError('');
    console.log('Login:', { email, password });
    navigate('/'); // Перенаправление на главную страницу
    // Здесь можно добавить логику авторизации (например, запрос к API)

    const resultAction = await dispatch(loginUser({ email, password })).unwrap();
            
            // Сохранение данных пользователя в localStorage
            localStorage.setItem('user', JSON.stringify(resultAction)); 
            localStorage.setItem('client_id', resultAction.client_id);
            localStorage.setItem('name', resultAction.name);
            localStorage.setItem('role', resultAction.role)
    
  };

  return (
    <div className="auth-container">
       <img src={authImage} alt="auth" />
       <div className="auth-container1">
    <h1 className="auth-title">Welcome back!</h1>
    <p className="auth-description">Enter your Credentials to access your account</p>
    <form
      className="auth-form"
      onSubmit={(e) => {
        e.preventDefault();
        handleLogin();
      }}
    >
      <label className="auth-label" htmlFor="email">
        Email address
      </label>
      <input
        id="email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="auth-input"
        placeholder="Enter your email"
      />
      <label className="auth-label" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="auth-input"
        placeholder="Enter your password"
      />
      <div className="auth-remember">
        <input id="remember" type="checkbox" />
        <label htmlFor="remember">Remember for 30 days</label>
      </div>
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
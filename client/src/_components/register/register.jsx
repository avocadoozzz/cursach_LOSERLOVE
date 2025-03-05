/*import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authImage from "../../assets/img/auth.png";
import googleImage from "../../assets/img/google.png";
import appleImage from "../../assets/img/apple.png";
import "./register.css";
import { registerUser } from '../../slices/userSlice'; 
import { useDispatch } from 'react-redux';

const Register = () => {
  const [username] = useState('');
  const [email] = useState('');
  const [password] = useState('');
  const [dateofbirth] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const dispatch = useDispatch();
   const [formData, setFormData] = React.useState({
    username: '',
    email:'',
    dateofbirth: '',
    password: '',
});

const handleChange = (e) => {
  const { id, value } = e.target;
  setFormData({ ...formData, [id]: value });
};


  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const handleRegister = async  () => {
    if (!username || !email || !password || !dateofbirth) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (calculateAge(dateofbirth) < 16) {
      setError('Регистрация доступна только для лиц старше 16 лет');
      return;
    }
    
    setError('');
    setIsAuthenticated(true);
    navigate('/');
    const newUser = { username };
setUser(newUser);
localStorage.setItem("user", JSON.stringify(newUser));
    navigate("/profilePage");
    try {
      const userData = {
        username,
          email, 
          password,
          dateofbirth,
          role: 'user',
      };
      
      localStorage.setItem('username', userData.username)
      localStorage.setItem('email', userData.email)
      localStorage.setItem('password', userData.password)
      localStorage.setItem('dateofbirth', userData.dateofbirth)
      localStorage.setItem('role', userData.role)
      console.log('Отправка данных на сервер:', userData);
      const result = await dispatch(registerUser(userData)).unwrap();
      console.log('Ответ сервера:', result);
      localStorage.setItem('client_id', result.client_id);
      navigate('/profilePage')
  } catch (error) {
      console.error('Ошибка при регистрации:', error);
      if (error.response && error.response.data) {
        console.error('Детали ошибки:', error.response.data);
        setError(error.response.data.message || 'Ошибка при регистрации');
      } else {
        setError('Ошибка при регистрации. Попробуйте еще раз.');
      }
  }
  };
  const handleBookClick = () => {
    if (isAuthenticated) {
      navigate('/booking');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="auth-container">
      <img src={authImage} alt="auth" />
      <div className="auth-container1">
        <h1 className="auth-title">Get Started Now</h1>
        <form className="auth-form" onSubmit={(e) => { e.preventDefault();  handleRegister(); }} >
          <label className="auth-label" htmlFor="name">Name</label>
          <input
            id="name"
            type="text"
            value={formData.username} onChange={handleChange}
            className="auth-input"
            placeholder="Enter your name"
            required
          />
          <label className="auth-label" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            value={formData.email} onChange={handleChange} 
            className="auth-input"
            placeholder="Enter your email"
            required
          />
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            value={formData.password} onChange={handleChange} 
            className="auth-input"
            placeholder="Enter your password"
            required
          />
          <label className="auth-label" htmlFor="dob">Date of Birth</label>
          <input
            id="dob"
            type="date"
            value={formData.dateofbirth} onChange={handleChange} 
            className="auth-input"
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <div className="auth-divider">
          <div className="auth-divider1"></div>
          <span>or</span>
        </div>
        <div className="auth-social">
          <button className="social-button google-button">
            <img src={googleImage} alt="Google" />
            Sign up with Google
          </button>
          <button className="social-button apple-button">
            <img src={appleImage} alt="Apple" />
            Sign up with Apple
          </button>
        </div>
        <p className="auth-footer">
          Already have an account? <a href="../auth">Login</a>
        </p>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Вы должны войти в систему или зарегистрироваться</p>
            <button onClick={() => navigate('/login')}>Войти</button>
            <button onClick={() => navigate('/register')}>Зарегистрироваться</button>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authImage from "../../assets/img/auth.png";
import googleImage from "../../assets/img/google.png";
import appleImage from "../../assets/img/apple.png";
import "./register.css";

const Register = () => {
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  // Состояние для формы
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    dateofbirth: '',
    password: '',
  });

  // Обработчик изменения полей ввода
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Функция для расчета возраста
  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  // Обработчик регистрации
  const handleRegister = async (e) => {
    e.preventDefault();

    const { username, email, password, dateofbirth } = formData;

    // Проверка заполнения полей
    if (!username || !email || !password || !dateofbirth) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    // Проверка возраста
    if (calculateAge(dateofbirth) < 16) {
      setError('Регистрация доступна только для лиц старше 16 лет');
      return;
    }

    setError('');
    setIsAuthenticated(true);

    try {
      const userData = {
        username,
        email,
        password,
        dateofbirth,
        role: 'user',
      };

      // Отправка данных на сервер
      console.log('Отправка данных на сервер:', userData);
      const response = await fetch('http://localhost:5000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Ошибка при регистрации');
      }

      const result = await response.json();
      console.log('Ответ сервера:', result);

      // Сохранение данных в localStorage
      localStorage.setItem('username', userData.username);
      localStorage.setItem('email', userData.email);
      localStorage.setItem('password', userData.password);
      localStorage.setItem('dateofbirth', userData.dateofbirth);
      localStorage.setItem('role', userData.role);
      localStorage.setItem('client_id', result.client_id);

      // Перенаправление на страницу профиля
      navigate('/');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError(error.message || 'Ошибка при регистрации. Попробуйте еще раз.');
    }
  };

  // Обработчик для кнопки "Book"
  const handleBookClick = () => {
    if (isAuthenticated) {
      navigate('/booking');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="auth-container">
      <img src={authImage} alt="auth" />
      <div className="auth-container1">
        <h1 className="auth-title">Get Started Now</h1>
        <form className="auth-form" onSubmit={handleRegister}>
          <label className="auth-label" htmlFor="username">Name</label>
          <input
            id="username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="auth-input"
            placeholder="Enter your name"
            required
          />
          <label className="auth-label" htmlFor="email">Email address</label>
          <input
            id="email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="auth-input"
            placeholder="Enter your email"
            required
          />
          <label className="auth-label" htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            placeholder="Enter your password"
            required
          />
          <label className="auth-label" htmlFor="dateofbirth">Date of Birth</label>
          <input
            id="dateofbirth"
            type="date"
            name="dateofbirth"
            value={formData.dateofbirth}
            onChange={handleChange}
            className="auth-input"
            required
          />
          {error && <p className="auth-error">{error}</p>}
          <button type="submit" className="auth-button">Sign Up</button>
        </form>
        <div className="auth-divider">
          <div className="auth-divider1"></div>
          <span>or</span>
        </div>
        <div className="auth-social">
          <button className="social-button google-button">
            <img src={googleImage} alt="Google" />
            Sign up with Google
          </button>
          <button className="social-button apple-button">
            <img src={appleImage} alt="Apple" />
            Sign up with Apple
          </button>
        </div>
        <p className="auth-footer">
          Already have an account? <a href="../auth">Login</a>
        </p>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>Вы должны войти в систему или зарегистрироваться</p>
            <button onClick={() => navigate('/login')}>Войти</button>
            <button onClick={() => navigate('/register')}>Зарегистрироваться</button>
            <button onClick={() => setShowModal(false)}>Закрыть</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
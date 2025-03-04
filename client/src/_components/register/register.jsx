import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import authImage from "../../assets/img/auth.png";
import googleImage from "../../assets/img/google.png";
import appleImage from "../../assets/img/apple.png";
import "./register.css";
import { registerUser } from '../../slices/userSlice'; 
import { useDispatch } from 'react-redux';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState('');
  const [error, setError] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
   const [user, setUser] = useState(null);
   const dispatch = useDispatch();
   const [formData, setFormData] = React.useState({
    name: '',
    email:'',
    dob: '',
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
    if (!name || !email || !password || !dob) {
      setError('Пожалуйста, заполните все поля');
      return;
    }

    if (calculateAge(dob) < 16) {
      setError('Регистрация доступна только для лиц старше 16 лет');
      return;
    }
    
    setError('');
    setIsAuthenticated(true);
    navigate('/');
    const newUser = { name };
setUser(newUser);
    navigate("/profilePage");
    try {
      const userData = {
          name,
          email, 
          password,
          dob,
          role: 'user',
      };
      
      localStorage.setItem('name', userData.name)
      localStorage.setItem('email', userData.email)
      localStorage.setItem('password', userData.password)
      localStorage.setItem('dob', userData.dob)
      localStorage.setItem('role', userData.role)
      const result = await dispatch(registerUser(userData)).unwrap();
      localStorage.setItem('client_id', result.client_id);
      navigate('/profilePage')
  } catch (error) {
      console.error('Ошибка при регистрации:', error);
      alert('Ошибка при регистрации. Попробуйте еще раз.'); 
  }

    //
    //localStorage.setItem("user", JSON.stringify(newUser));
    

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
            value={formData.name} onChange={handleChange}
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
            value={formData.dob} onChange={handleChange} 
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

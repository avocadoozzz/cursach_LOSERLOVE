import React, { createContext, useState, useContext } from 'react';

// Создание контекста
const AuthContext = createContext();

// Провайдер для управления состоянием авторизации
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

// Хук для использования состояния в компонентах
export const useAuth = () => {
  return useContext(AuthContext);
};

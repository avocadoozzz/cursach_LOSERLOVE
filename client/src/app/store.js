// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
// import userReducer from '../features/user/userSlice';  // пример использования слайса для работы с пользователем
// import authReducer from '../features/auth/authSlice';  // например для авторизации

// Создаем Redux store
const store = configureStore({
  reducer: {
   // user: userReducer,       // редьюсер для состояния пользователя
   // auth: authReducer,       // редьюсер для состояния авторизации
  },
});

export default store;

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    loading: false,
    currentUser: null,
    error: null,
};

// Async thunk для логина пользователя
export const loginUser = createAsyncThunk('api/auth/login', async (credentials) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', credentials);
    return response.data;
});

// Async thunk для регистрации пользователя
export const registerUser = createAsyncThunk('api/register', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/register', userData);
    return response.data; 
});

export const adminAddUser = createAsyncThunk('api/users/register/admin', async (userData) => {
    const response = await axios.post('http://localhost:5000/api/users', userData);
    return response.data; 
});

// Async thunk для обновления данных пользователя
export const updateUserThunk = createAsyncThunk('api/users/:id', async ( currentUser ) => {
    const response = await axios.put(`http://localhost:5000/api/users/${currentUser.userId}`, currentUser );
    return response.data; 
});



// Создание слайса
const userSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.users.push(action.payload);
        },
        updateUser: (state, action) => {
            const index = state.users.findIndex(user => user.idUser === action.payload.idUser);
            if (index !== -1) {
                state.users[index] = action.payload;
            }
        },
        // deleteUser: (state, action) => {
        //     state.users = state.users.filter(user => user.idUser !== action.payload.userId);
        // },
        setCurrentUser: (state, action) => {
            state.currentUser = action.payload;
        },   
        toggleBlock(state, action) {
            const user = state.users.find(user => user.client_id === action.payload);
            if (user) {
                user.isBlocked = !user.isBlocked; 
            }
        },   
    },
    extraReducers: (builder) => {
        builder
            .addCase(loginUser.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; 
            })
            .addCase(loginUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(registerUser.fulfilled, (state, action) => {
                state.loading = false;
                state.currentUser = action.payload; 
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            .addCase(adminAddUser.fulfilled, (state, action) => {
                state.loading = false;
                state.users.push(action.payload); 
            })
            .addCase(adminAddUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });      
    },
});

// Экспорт редьюсеров
export const { addUser, updateUser, setCurrentUser } = userSlice.actions;
export default userSlice.reducer;
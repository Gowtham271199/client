import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuthenticated: false,
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        loginSuccess: (state, action) => {
            state.token = action.payload;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.token = null;
            state.user = null;
            state.isAuthenticated = false;
        },
        setUser: (state, action) => {
            state.user = action.payload;
        },
    },
});

export const { loginSuccess, logout, setUser } = authSlice.actions;

export const register = (userData) => async (dispatch) => {
    try {
        const res = await axios.post('http://localhost:5000/api/users/signup', userData);
        dispatch(loginSuccess(res.data.token));
        localStorage.setItem('token', res.data.token);
    } catch (error) {
        console.error('Error during registration:', error.response.data.msg || error.message);
        throw error;
    }
};

export const login = (credentials) => async (dispatch) => {
    const res = await axios.post('http://localhost:5000/api/users/login', credentials);
    dispatch(loginSuccess(res.data.token));
    localStorage.setItem('token', res.data.token);
};

export const getProfile = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/users/profile', {
            headers: {
                'x-auth-token': localStorage.getItem('token'),
            },
        });
        dispatch(setUser(res.data));
    } catch (error) {
        console.error('Error fetching profile:', error.response?.data || error.message);
    }
};

export const updateProfile = (profileData) => async (dispatch) => {
    try {
        console.log('Updating profile with data:', profileData); // Debugging line
        const response = await axios.put('http://localhost:5000/api/users/profile', profileData, {
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': localStorage.getItem('token'),
            },
        });

        console.log('Response:', response); // Debugging line

        if (response.status === 200) {
            dispatch(setUser(response.data));
            console.log('Profile updated successfully'); // Debugging line
        } else {
            console.error('Update failed:', response.data);
        }
    } catch (error) {
        console.error('Update error:', error.response?.data || error.message);
    }
};
export default authSlice.reducer;

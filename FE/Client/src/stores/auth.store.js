import { createSlice } from '@reduxjs/toolkit';
import AuthService from '~/services/auth.service';
import { setAmount } from './cart.store';

export const counterSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isExpire: false,
    },
    reducers: {
        loadAuthState: (state) => {
            state.user = JSON.parse(localStorage.getItem('user'));
        },
        logout: (state) => {
            state.user = null;
            localStorage.removeItem('user');
        },
        login: (state, userdata) => {
            state.user = userdata.payload;
        },
        register: (user) => {
            this.user = null;
            return AuthService.register(user);
        },
        setExpired: (state, actions) => {
            state.isExpire = actions.payload;
        },
    },
});

// Action creators are generated for each case reducer function
export const { login, setExpired, loadAuthState, logout } = counterSlice.actions;

export default counterSlice.reducer;

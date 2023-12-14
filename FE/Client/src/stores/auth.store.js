import { createSlice } from '@reduxjs/toolkit';
import AuthService from '~/services/auth.service';

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
        logout: () => {
            this.user = null;
            localStorage.removeItem('user');
            // let CartStore = cartStore();
            // CartStore.setAmount(0);
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

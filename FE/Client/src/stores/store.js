import { configureStore } from '@reduxjs/toolkit';
import auth from './auth.store';
import cart from './cart.store';

export default configureStore({
    reducer: {
        auth: auth,
        cart: cart,
    },
});

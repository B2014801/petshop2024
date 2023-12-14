import { configureStore } from '@reduxjs/toolkit';
import auth from './auth.store';

export default configureStore({
    reducer: {
        auth: auth,
    },
});

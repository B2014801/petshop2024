import { createSlice } from '@reduxjs/toolkit';

export const cartSlide = createSlice({
    name: 'cart',
    initialState: {
        amount: 0,
    },
    reducers: {
        setAmount: (state, action) => {
            state.amount = action.payload;
        },
        plusAmount: (state) => {
            state.amount++;
        },
        minusAmount: (state) => {
            state.amount--;
        },
    },
});

export const { setAmount, plusAmount, minusAmount } = cartSlide.actions;
export default cartSlide.reducer;

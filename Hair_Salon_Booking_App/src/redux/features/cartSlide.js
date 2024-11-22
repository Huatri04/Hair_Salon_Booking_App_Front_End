import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
    name: 'cart',
    initialState: [],
    reducers: {
        addProduct: (state, action) => {
            // Ensure that action.payload is a valid product object
            state.push(action.payload); // This is valid Immer usage
        },
        removeProduct: (state, action) => {
            // Ensure that action.payload contains the right id
            return state.filter(product => product.id !== action.payload.id); // This is also valid Immer usage
        },
        resetCart: () => {
            return []; // Resetting the cart to an empty array
        },
    },
});

export const { addProduct, removeProduct, resetCart } = cartSlice.actions;
export default cartSlice.reducer;

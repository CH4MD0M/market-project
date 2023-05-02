import { createSlice } from '@reduxjs/toolkit';

interface CartState {
  cartItems: any[];
  itemsCount: number;
  cartSubtotal: number;
}

const initialState: CartState = {
  cartItems: [],
  itemsCount: 0,
  cartSubtotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart(state, action) {},
    removeFromCart(state, action) {},
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

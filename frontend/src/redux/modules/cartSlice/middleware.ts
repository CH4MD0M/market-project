import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';
import { addToCart, removeFromCart, updateCart } from '.';

export const cartListenerMiddleware = createListenerMiddleware();
cartListenerMiddleware.startListening({
  matcher: isAnyOf(addToCart, updateCart, removeFromCart),
  effect: (_, { getState }) => {
    const cartItems = (getState() as RootState).cart.cartItems;
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  },
});

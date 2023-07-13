import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '@redux/store';

const selectCartItems = (state: RootState) => state.cart.cartItems;

export const selectItemsCount = createSelector([selectCartItems], cartItems => {
  return cartItems.reduce((quantity, item) => quantity + Number(item.quantity), 0);
});

export const selectCartSubtotal = createSelector([selectCartItems], cartItems =>
  cartItems.reduce((price, item) => price + item.price * item.quantity, 0),
);

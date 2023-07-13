import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddToCartPayload, CartState, RemoveFromCartPayload } from './types';
import { StorageType, getValue } from '@utils/storageUtils';

const cartItemsInLocalStorage = getValue(StorageType.LOCAL, 'cartItems');

const initialState: CartState = {
  cartItems: cartItemsInLocalStorage || [],
  itemsCount: 0,
  cartSubtotal: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // 장바구니 추가
    addToCart: (state, action: PayloadAction<AddToCartPayload>) => {
      const { _id, name, price, count, images, quantity } = action.payload;
      const productBeingAddedToCart = {
        _id,
        name,
        price,
        count,
        image: images[0] ?? null,
        quantity,
      };

      const existingProductIndex = state.cartItems.findIndex(
        item => item._id === productBeingAddedToCart._id,
      );

      if (existingProductIndex !== -1) {
        state.cartItems[existingProductIndex] = productBeingAddedToCart;
      } else {
        state.cartItems.push(productBeingAddedToCart);
      }
    },

    // 장바구니 삭제
    removeFromCart(state, action: PayloadAction<RemoveFromCartPayload>) {
      const { _id } = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== _id);
    },

    // 장바구니 상품 수량 변경
    updateCart(state, action) {
      const { _id, quantity } = action.payload;
      const productBeingAddedToCart = state.cartItems.find(item => item._id === _id);

      if (productBeingAddedToCart) {
        productBeingAddedToCart.quantity = quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCart } = cartSlice.actions;
export default cartSlice.reducer;

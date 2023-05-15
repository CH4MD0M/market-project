import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { CartState, RemoveFromCartPayload } from './types';
import { StorageType, getValue, setValue } from '@utils/storageUtils';
import { addToCartAsync } from './thunk';

const cartItemsInLocalStorage = getValue(StorageType.LOCAL, 'cartItems');

const initialState = {
  cartItems: cartItemsInLocalStorage || [],
  itemsCount:
    cartItemsInLocalStorage?.reduce(
      (quantity: number, item: CartProduct) => Number(item.quantity) + quantity,
      0,
    ) || 0,
  cartSubtotal:
    cartItemsInLocalStorage?.reduce(
      (price: number, item: CartProduct) => price + item.price * item.quantity,
      0,
    ) || 0,
} as CartState;

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const productBeingAddedToCart = action.payload;

      const productAlreadyExistsInState = state.cartItems.find(
        item => item._id === productBeingAddedToCart._id,
      );

      if (productAlreadyExistsInState) {
        state.itemsCount = 0;
        state.cartSubtotal = 0;
        state.cartItems = state.cartItems.map(x => {
          if (x._id === productAlreadyExistsInState._id) {
            state.itemsCount += Number(productBeingAddedToCart.quantity);
            const sum =
              Number(productBeingAddedToCart.quantity) * Number(productBeingAddedToCart.price);
            state.cartSubtotal += sum;
          } else {
            state.itemsCount += Number(x.quantity);
            const sum = Number(x.quantity) * Number(x.price);
            state.cartSubtotal += sum;
          }
          return x._id === productAlreadyExistsInState._id ? productBeingAddedToCart : x;
        });
      } else {
        state.itemsCount += Number(productBeingAddedToCart.quantity);
        const sum =
          Number(productBeingAddedToCart.quantity) * Number(productBeingAddedToCart.price);
        state.cartSubtotal += sum;
        state.cartItems.push(productBeingAddedToCart);
      }
    },

    removeFromCart(state, action: PayloadAction<RemoveFromCartPayload>) {
      const { _id, quantity, price } = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== _id);
      state.itemsCount -= quantity;
      state.cartSubtotal -= price * quantity;

      setValue(StorageType.LOCAL, 'cartItems', state.cartItems);
    },
  },
  extraReducers: builder => {
    builder.addCase(addToCartAsync.fulfilled, (_, action) => {
      setValue(StorageType.LOCAL, 'cartItems', action.payload);
    });
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;

import { createAsyncThunk } from '@reduxjs/toolkit';

import { RootState } from '@redux/store';
import { addToCart } from '.';
import { AddToCartPayload } from './types';
import { getSingleProduct } from '@utils/api';

export const addToCartAsync = createAsyncThunk<
  CartProduct[],
  AddToCartPayload,
  { state: RootState }
>('cart/addToCartAsync', async (payload, { dispatch, getState }) => {
  const { data } = await getSingleProduct(payload.id);

  const cartItem = {
    productID: data._id,
    name: data.name,
    price: data.price,
    image: data.images[0] ?? null,
    count: data.count,
    quantity: payload.quantity,
  };

  dispatch(addToCart(cartItem));

  const cartItems = getState().cart.cartItems;
  return cartItems;
});

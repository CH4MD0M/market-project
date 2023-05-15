export interface CartState {
  cartItems: CartProduct[];
  itemsCount: number;
  cartSubtotal: number;
}

export interface AddToCartPayload {
  id: string;
  quantity: number;
}

export interface RemoveFromCartPayload {
  _id: string;
  quantity: number;
  price: number;
}

export interface CartState {
  cartItems: CartProduct[];
  itemsCount: number;
  cartSubtotal: number;
}

export interface AddToCartPayload {
  _id: string;
  name: string;
  price: number;
  count: number;
  images: any[];
  quantity: number;
}

export interface RemoveFromCartPayload {
  _id: string;
}

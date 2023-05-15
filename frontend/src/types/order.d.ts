interface OrderData {
  orderTotal: {
    itemsCount: number;
    cartSubtotal: number;
  };
  cartItems: CartProduct[];
}

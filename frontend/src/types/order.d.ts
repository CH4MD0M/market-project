interface OrderDetails {
  _id: string;
  user: {
    _id: string;
    name: string;
    email: string;
  };
  paymentMethod: string;
  isPaid: boolean;
  paidAt: Date;
  isDelivered: boolean;
  deliveredAt: Date;
  orderTotal: {
    cartSubtotal: number;
  };
  cartItems: any[];
}

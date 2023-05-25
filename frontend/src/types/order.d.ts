interface OrderData {
  orderTotal: {
    itemsCount: number;
    cartSubtotal: number;
  };
  cartItems: CartProduct[];
}

interface OrderDataForAdmin extends OrderData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  paymentMethod: string;
  user: string;
}

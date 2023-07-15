interface OrderData {
  orderTotal: {
    itemsCount: number;
    cartSubtotal: number;
  };
  cartItems: CartProduct[];
}

interface OrderDetailsData extends OrderData {
  _id: string;
  createdAt: string;
  updatedAt: string;
  deliveredAt: string;
  isDelivered: boolean;
  isPaid: boolean;
  user: string;
}

interface OrderUserData {
  name: string;
  email: string;
  address: string;
  phoneNumber: string;
  zipCode: string;
}

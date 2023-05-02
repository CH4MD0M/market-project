type CartItem = {
  id: number;
  name: string;
  image: any;
  price: number;
  count: number;
  quantity: number;
};

interface OrderItemsProps {
  cartItems: CartItem[];
}

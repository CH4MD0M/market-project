interface CartProduct {
  _id: string;
  name: string;
  image: any;
  price: number;
  count: number;
  quantity: number;
  isReviewed?: boolean;
}

type OrderProduct = CartProduct;
